import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { IAuthResponse } from 'interfaces';
import { SigninDto } from './dto/signin.dto';
import { UserService } from '../user/';
import { TokenService } from '../token/token.service';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';
import { SignupGuard } from './guards/signup.guard';
import { Roles } from '@prisma/client';
import * as crypto from 'node:crypto';
import { SigninGuard } from './guards/signin.guard';
import { generateHashPassword } from './helpers/password.helperst';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService
  ) {}

  @UseGuards(SignupGuard)
  @Post('/signup')
  public async signup(
    @Body() { email, nickname, ...body }: SignupDto,
    @Res({ passthrough: true }) res
  ): Promise<IAuthResponse> {
    const { hashPassword, salt } = await generateHashPassword(body.password);

    const link = crypto.randomUUID();

    const userQuery = this.userService.createOne({
      hashPassword,
      email,
      nickname,
      salt,
      isActived: false,
      role: Roles.USER,
      link,
    });

    const mailQuery = this.mailService.sendMail({
      user: { email, nickname },
      urlConfirmAddress: link,
    });

    const tokensQuery = this.tokenService.generateTokens({ email });

    const [tokens, user] = await Promise.all([
      tokensQuery,
      userQuery,
      mailQuery,
    ]);

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
    @Body() { email }: SigninDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IAuthResponse> {
    const userQuery = this.userService.findOne({ email });

    const tokensQuery = this.tokenService.generateTokens({ email });

    const [{ nickname, isActived }, tokens] = await Promise.all([
      userQuery,
      tokensQuery,
    ]);

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
      email: email,
      nickname,
      isActived,
    };
  }

  @Render('thank-you.ejs')
  @Get(`/activate-account/:link`)
  public async activeAccount(@Param('link') link: string): Promise<void> {
    await this.userService.updateOne({ link }, { isActived: true });
  }
}
