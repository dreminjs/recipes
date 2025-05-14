import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
  Res,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { IAuthResponse } from 'interfaces';
import { SigninDto } from './dto/signin.dto';
import { UserService } from '../user/';
import { TokenService } from '../token/token.service';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';
import { Roles } from '@prisma/client';
import { generateHashPassword } from './helpers/password.helper';
import * as crypto from 'node:crypto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly authService: AuthService
  ) {}

  @Post('signup')
  public async signup(
    @Body() { email, nickname, ...body }: SignupDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IAuthResponse> {
    const user = await this.userService.findOne({ email });

    if (user) {
      throw new BadRequestException('Такой пользователь уже существует!');
    }

    const { hashedPassword, salt } = await generateHashPassword(body.password);

    const link = crypto.randomUUID();

    const userQuery = this.userService.createOne({
      hashPassword: hashedPassword,
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

    const [{ accessToken, refreshToken }, { isActived }] = await Promise.all([
      tokensQuery,
      userQuery,
      mailQuery,
    ]);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    return {
      nickname,
      email,
      isActived,
    };
  }

  @Post('signin')
  public async signin(
    @Body() { email, ...dto }: SigninDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IAuthResponse> {
    await this.authService.validateUser({ ...dto, email });

    const userQuery = this.userService.findOne({ email });

    const tokensQuery = this.tokenService.generateTokens({ email });

    const [{ nickname, isActived }, { accessToken, refreshToken }] =
      await Promise.all([userQuery, tokensQuery]);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return {
      email,
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
