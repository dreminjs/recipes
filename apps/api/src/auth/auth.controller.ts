import {
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
import { IAuthResponse, IStandardResponse } from 'interfaces';
import { SigninDto } from './dto/signin.dto';
import { CurrentUser, UserService } from '../user/';
import { TokenService } from '../token/token.service';
import { Response } from 'express';
import { MailService } from '../mail/mail.service';
import { User } from '@prisma/client';
import { generateHashPassword } from './helpers/password.helper';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from '../token';
import { PasswordService } from '../password/password.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
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

  @Post('signup')
  public async signup(
    @Body() { email, nickname, ...body }: SignupDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IStandardResponse> {
    await this.authService.ensureUserDoesNotExist(email);

    const newUser = await this.authService.signup({ email, nickname, ...body });

    return this.tokenService.generateTokens(
      {
        userId: newUser.id,
      },
      res
    );
  }

  @Post('2fa/signin')
  public async signinWithTwoFa(
    @Body() { secret, email }: SigninTwoFaDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IStandardResponse<IAuthResponse>> {
    const user = await this.authService.validate2faSignin({ secret, email });

    return this.tokenService.generateTokens({ userId: user.id }, res);
  }

  @Post('signin')
  public async signin(
    @Body() { email, ...dto }: SigninDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IStandardResponse> {
    const user = await this.authService.validateUser({
      password: dto.password,
      email,
    });

    if (user.isTwoFactorEnabled) {
      return await this.authService.requestTwoFactor(user);
    } else {
      return await this.tokenService.generateTokens({ userId: user.id }, res);
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
    const { id: userId, nickname } = await this.authService.ensureUserExists(email);

    await this.passwordService.findOneAndDelete(userId)

    await this.passwordService.createResetRequest({id: userId, nickname, email});

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
