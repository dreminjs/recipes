import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Post,
  Render,
  Res,
  UnauthorizedException,
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
import { SigninTwoFaDto } from './dto/signin-2fa.dto';
import { TwoFaParamsDto } from './dto/2fa-params.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
    private readonly passwordService: PasswordService
  ) {}

  private logger = new Logger(AuthController.name);

  @Post('signup')
  public async signup(
    @Body() { email, nickname, ...body }: SignupDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IStandardResponse> {
    const oldUser = await this.userService.findOne({ email });

    if (oldUser) {
      throw new BadRequestException('Такой пользователь уже существует!');
    }

    const { hashedPassword, salt } = await generateHashPassword(body.password);

    const link = crypto.randomUUID();

   const newUser = await this.userService.createOne({
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

    const tokensQuery = this.tokenService.generateTokens({ userId: newUser.id });

    const [{ accessToken, refreshToken }, mail] = await Promise.all([
      tokensQuery,
      mailQuery,
    ]);

    this.logger.log(mail)

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

  @Post('2fa/signin')
  public async signinWithTwoFa(
    @Body() { secret, email }: SigninTwoFaDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IStandardResponse<IAuthResponse>> {
    const user = await this.userService.findOne({ email });

    if (user.twoFactorSecret !== secret) {
      throw new UnauthorizedException('Неверный код');
    }

    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens({ userId: user.id });
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
      message: 'успех!',
      success: true,
      data: {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
        isActived: user.isActived,
        role: Roles.USER,
        twoFactorSecret: user.twoFactorSecret,
        isTwoFactorEnabled: user.isTwoFactorEnabled,
      },
    };
  }

  @Post('signin')
  public async signin(
    @Body() { email, ...dto }: SigninDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IStandardResponse<IAuthResponse>> {
    const user = await this.authService.validateUser({ password: dto.password, email });

    if (user.isTwoFactorEnabled) {
      const token = speakeasy.generateSecret({
        length: 5,
      });

      const updatedUserQuery = this.userService.updateOne(
        {
          id: user.id,
        },
        {
          twoFactorSecret: token.ascii,
        }
      );

      const mailQuery = this.mailService.sendTwoFaSecret({
        nickname: user.nickname,
        email: user.email,
        secret: token.ascii,
      });

      await Promise.all([updatedUserQuery, mailQuery]);

      return {
        message: 'На вашу почту поступил Код!',
        success: true,
        data: {
          email: user.email,
          id: user.id,
          nickname: user.nickname,
          isActived: user.isActived,
          role: user.role,
          twoFactorSecret: user.twoFactorSecret,
          isTwoFactorEnabled: user.isTwoFactorEnabled,
        },
      };
    } else {
      const { accessToken, refreshToken } =
        await this.tokenService.generateTokens({ userId: user.id });
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
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessTokenGuard)
  @Delete('signout')
  public async signout(
    @CurrentUser('id') userId: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    await this.tokenService.deleteOne({ where: { userId } });
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
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

    await this.userService.updateOne(
      {
        email,
      },
      { isTwoFactorEnabled: null }
    );

    return {
      message: 'письмо отправлено!',
      success: true,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Post('2fa/enable/request')
  public async requestEnableTwoFactor(
    @CurrentUser() { id: userId, nickname, email }: User
  ): Promise<IStandardResponse> {
    await this.mailService.sendRequestEnableTwoFa({
      id: userId,
      nickname,
      email,
    });

    await this.userService.updateOne(
      {
        email,
      },
      { isTwoFactorEnabled: null }
    );

    return {
      success: true,
      message: 'письмо отправленно',
    };
  }

  @UseGuards(AccessTokenGuard)
  @Post('2fa/disable/request')
  public async requestDisableTwoFactor(
    @CurrentUser() { id: userId, nickname, email }: User
  ): Promise<IStandardResponse> {
    await this.mailService.sendRequestDisableTwoFa({
      id: userId,
      nickname,
      email,
    });

    await this.userService.updateOne(
      {
        email,
      },
      { isTwoFactorEnabled: null }
    );

    return {
      success: true,
      message: 'письмо отправленно',
    };
  }

  @Get('2fa/enable/:userId')
  @Render('thank-you-for-2fa-enabled.ejs')
  public async enableTwoFactorAuth(
    @Param() { userId }: TwoFaParamsDto
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

  @Get('2fa/disable/:userId')
  @Render('thank-you-for-2fa-disabled.ejs')
  public async disableTwoFactorAuth(
    @Param() { userId }: TwoFaParamsDto
  ): Promise<IStandardResponse> {
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

  @Render('thank-you-for-email-confirm.ejs')
  @Get(`/activate-account/:link`)
  public async activateAccount(@Param('link') link: string): Promise<void> {
    await this.userService.updateOne({ link }, { isActived: true });
  }
}
