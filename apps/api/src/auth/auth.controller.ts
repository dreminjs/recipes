import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { IAuthResponse } from 'interfaces';
import { SigninDto } from './dto/signin.dto';
import { PasswordService } from '../password/password.service';
import { CurrentUser, UserService } from '../user/';
import { TokenService } from '../token/token.service';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';
import { SignupGuard } from './guards/signup.guard';
import { AccessTokenGuard } from '../token';
import { User } from '@prisma/client';
import * as crypto from 'node:crypto';
import { SigninGuard } from './guards/signin.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService
  ) {}

  @UseGuards(SignupGuard)
  @Post('/signup')
  public async signup(
    @Body() body: SignupDto,
    @Res({ passthrough: true }) res
  ): Promise<IAuthResponse> {
    const { hashPassword, salt } =
      await this.passwordService.generateHashPassword(body.password);

    const link = crypto.randomUUID();

    const userQuery = this.userService.createOne({
      hashPassword: hashPassword,
      email: body.email,
      nickname: body.nickname,
      salt: salt,
      isActived: false,
      role: 'USER',
      link,
    });

    const mailQuery = this.mailService.sendMail({
      user: { email: body.email, nickname: body.nickname },
      urlConfirmAddress: link,
    });

    const tokensQuery = this.tokenService.generateTokens({ email: body.email });

    const [tokens, user] = await Promise.all([tokensQuery, userQuery, mailQuery]);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    return {
      nickname: user.nickname,
      email: user.email,
      isActived: user.isActived,
    };
  }

  @UseGuards(SigninGuard)
  @Post('/signin')
  public async signin(
    @Body() body: SigninDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IAuthResponse> {
    const userQuery = this.userService.findOne({ email: body.email });

    const tokensQuery = this.tokenService.generateTokens({ email: body.email });
    
    const [user,tokens] = await Promise.all([userQuery,tokensQuery])

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return {
      email: body.email,
      nickname: user.nickname,
      isActived: user.isActived,
    };
  }

  @Render('thank-you.ejs')
  @Get(`/activate-account/:link`)
  public async activeAccount(@Param('link') link: string): Promise<void> {
    await this.userService.updateOne({ link }, { isActived: true });
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  public async findMySelf(@CurrentUser() user: User): Promise<IAuthResponse> {
    return {
      email: user.email,
      nickname: user.nickname,
      isActived: user.isActived,
    };
  }
}
