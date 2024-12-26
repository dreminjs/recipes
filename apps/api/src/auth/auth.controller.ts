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
import { UserService } from '../user/';
import { TokenService } from '../token/token.service';

import { MailService } from '../mail/mail.service';
import { SignupGuard } from './guards/signup.guard';

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

    const tokens = await this.tokenService.generateTokens(user);

    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true });

    return {
      nickname: user.nickname,
      email: user.email,
      isActived: user.isActived,
    };
  }

  @Post('/signin')
  public async signin(
    @Body() body: SigninDto,
    @Res({ passthrough: true }) res
  ): Promise<IAuthResponse> {
    const user = await this.userService.findOne({ email: body.email });

    const tokens = await this.tokenService.generateTokens(user);

    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true });

    return {
      email: body.email,
      nickname: user.nickname,
      isActived: user.isActived,
    };
  }

  @Render('thank-you.ejs')
  @Get(`/active-account/:link`)
  public async activeAccount(@Param('link') link: string) {

    this.logger.log(link, "LINK");

    const user = await this.userService.findOne({
      link
    });

    await this.userService.updateOne(
      { link, email: user.email, id: user.id },
      { isActived: true }
    );
  }
}
