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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService
  ) {}

  private logger = new Logger(AuthController.name);

  @UseGuards(SignupGuard)
  @Post('/signup')
  public async signup(
    @Body() body: SignupDto,
    @Res({ passthrough: true }) res
  ): Promise<IAuthResponse> {
    const { hashPassword, salt } =
      await this.passwordService.generateHashPassword(body.password);

    const link = crypto.randomUUID();

    const user = await this.userService.createOne({
      hashPassword: hashPassword,
      email: body.email,
      nickname: body.nickname,
      salt: salt,
      isActived: false,
      role: 'USER',
      link,
    });

    await this.mailService.sendMail({ user, urlConfirmAddress: link });

    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens(user);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
      domain: 'localhost',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
      domain: 'localhost',
    });
    return {
      nickname: user.nickname,
      email: user.email,
      isActived: user.isActived,
    };
  }

  @Post('/signin')
  public async signin(
    @Body() body: SigninDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<IAuthResponse> {
    const user = await this.userService.findOne({ email: body.email });

    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens(user);

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
      email: body.email,
      nickname: user.nickname,
      isActived: user.isActived,
    };
  }

  @Render('thank-you.ejs')
  @Get(`/active-account/:link`)
  public async activeAccount(@Param('link') link: string) {
    this.logger.log(link, 'LINK');

    const user = await this.userService.findOne({
      link,
    });

    await this.userService.updateOne(
      { link, email: user.email, id: user.id },
      { isActived: true }
    );
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  public async index(@CurrentUser() user: User): Promise<IAuthResponse> {
    return {
      email: user.email,
      nickname: user.nickname,
      isActived: user.isActived,
    };
  }
}
