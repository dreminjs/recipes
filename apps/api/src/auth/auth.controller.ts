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
  Render,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { IAuthResponse } from 'interfaces';
import { SigninDto } from './dto/signin.dto';
import { CurrentUser, UserService } from '../user/';
import { TokenService } from '../token/token.service';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';
import { Roles } from '@prisma/client';
import { generateHashPassword, hashPassword } from './helpers/password.helper';
import * as crypto from 'node:crypto';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from '../token';
import { PasswordService } from '../password/password.service';
import { IStandardResponse } from '../shared/interfaces/response.interface';
import { ResetPasswordDto } from './dto/reset-password.dto';

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

    const passwordResetToken = await this.passwordService.createResetRequest(
      userId
    );

    await this.mailService.sendResetPasswordMail(
      {
        user: { email, nickname },
      },
      passwordResetToken.token
    );

    return {
      message: 'письмо отправлено!',
      success: true,
    };
  }

  @Post('reset-password')
  public async resetPassword(@Body() { token, newPassword }: ResetPasswordDto): Promise<IStandardResponse> {
    const resetToken = await this.passwordService.findOne({
      where: {
        token,
      },
    });

    const { hashedPassword, salt } = await generateHashPassword(newPassword);

     await this.userService.updateOne(
      {
        id: resetToken.userId,
        salt
      },
      {
        hashPassword: hashedPassword,
      }
    );

    return {
      message: "пароль изменён",
      success: true
    }
  }

  @Render('thank-you.ejs')
  @Get(`/activate-account/:link`)
  public async activeAccount(@Param('link') link: string): Promise<void> {
    await this.userService.updateOne({ link }, { isActived: true });
  }
}
