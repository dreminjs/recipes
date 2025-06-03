import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { IAuthResponse, IStandardResponse } from 'interfaces';
import { SigninDto } from './dto/signin.dto';
import { CurrentUser, UserService } from '../user/';
import { TokenService } from '../token/token.service';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';
import { Roles, User } from '@prisma/client';
import { generateHashPassword } from './helpers/password.helper';
import * as crypto from 'node:crypto';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from '../token';
import { PasswordService } from '../password/password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as speakeasy from 'speakeasy';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService
  ) {}

  @Post('signup')
  public async signup(
    @Body() { email, nickname, ...body }: SignupDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IStandardResponse<IAuthResponse>> {
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

    const mailQuery = this.mailService.sendConfirmationEmail({
      user: { email, nickname },
      urlConfirmAddress: link,
    });

    const tokensQuery = this.tokenService.generateTokens({ email });

    const [{ accessToken, refreshToken }] = await Promise.all([
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
      message: 'успешно!',
      success: true,
    };
  }

  @Post('signin')
  public async signin(
    @Body() { email, ...dto }: SigninDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IStandardResponse<IAuthResponse>> {
    await this.authService.validateUser({ ...dto, email });

    const userQuery = this.userService.findOne({ email });

    const tokensQuery = this.tokenService.generateTokens({ email });

    const [_, { accessToken, refreshToken }] = await Promise.all([
      userQuery,
      tokensQuery,
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
      message: 'успешно!',
      success: true,
    };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessTokenGuard)
  @Delete('signout')
  public async signout(
    @CurrentUser('id') userId: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    await this.tokenService.deleteOne({ where: { userId } });
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
  }

  @Post('request-reset-password')
  public async requestResetPassword(
    @Body('email') email: string
  ): Promise<IStandardResponse> {
    const user = await this.userService.findOne({ email });

    if (!user) throw new NotFoundException('такого пользователя не существует');

    const { id: userId, nickname } = user;

    const passwordResetToken = await this.passwordService.findOne({
      where: { userId },
    });

    if (passwordResetToken) {
      await this.passwordService.deleteOne(userId);
    }

    const createdPasswordResetToken =
      await this.passwordService.createResetRequest(userId);

    await this.mailService.sendResetPasswordMail(
      { email, nickname },
      createdPasswordResetToken.token
    );

    return {
      message: 'письмо отправлено!',
      success: true,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Post('2fa/request')
  public async requestEnableTwoFactor(
    @CurrentUser() { id: userId, nickname, email }: User
  ): Promise<IStandardResponse> {
    await this.mailService.sendRequestTwoFaEnable({
      id: userId,
      nickname,
      email,
    });

    return {
      success: true,
      message: 'письмо отправленно',
    };
  }

  @Render('thank-you-for-2fa-enabled.ejs')
  @Get('2fa/enable/:userId')
  public async enableTwoFactorAuth(
    @Param('userId') userId: string
  ): Promise<IStandardResponse> {
    await this.userService.updateOne(
      { id: userId },
      { isTwoFactorEnabled: true }
    );

    return {
      success: true,
      message: '2fa включен!',
    };
  }

  @UseGuards(AccessTokenGuard)
  @Put('2fa/disable')
  public async disableTwoFactorAuth(@CurrentUser('id') userId: string): Promise<IStandardResponse> {
    await this.userService.updateOne(
      { id: userId },
      { isTwoFactorEnabled: false }
    );

    return {
      success: true,
      message: '2fa выключен!',
    };
  }

  @Post('reset-password')
  public async resetPassword(
    @Body() { token, newPassword }: ResetPasswordDto
  ): Promise<IStandardResponse> {
    const resetToken = await this.passwordService.findOne({
      where: {
        token,
      },
    });

    const { hashedPassword, salt } = await generateHashPassword(newPassword);

    await this.userService.updateOne(
      {
        id: resetToken.userId,
      },
      {
        hashPassword: hashedPassword,
        salt,
      }
    );

    await this.passwordService.deleteOne(resetToken.userId);

    return {
      message: 'пароль изменён',
      success: true,
    };
  }

  @Render('thank-you.ejs')
  @Get(`/activate-account/:link`)
  public async activateAccount(@Param('link') link: string): Promise<void> {
    await this.userService.updateOne({ link }, { isActived: true });
  }
}
