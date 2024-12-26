import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { IAuthResponse } from 'interfaces';
import { SigninDto } from './dto/signin.dto';
import { PasswordService } from '../password/password.service';
import { UserService } from '../user/';
import { TokenService } from '../token/token.service';
import { SignupGuard } from './guards/signup.guard';
import { SigninGuard } from './guards/signin.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  @Post('/signup')
  @UseGuards(SignupGuard)
  public async signup(
    @Body() body: SignupDto,
    @Res({ passthrough: true }) res
  ): Promise<IAuthResponse> {
    const { hashPassword, salt } =
      await this.passwordService.generateHashPassword(body.password);

    const user = await this.userService.createOne({
      hashPassword: hashPassword,
      email: body.email,
      nickname: body.nickname,
      salt: salt,
    });

    const tokens = await this.tokenService.generateTokens(user);

    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true });

    return {
      nickname: user.nickname,
      email: user.email,
    };
  }

  @UseGuards(SigninGuard)
  @Post('/signin')
  public async signin(
    @Body() body: SigninDto,
    @Res({ passthrough: true }) res
  ): Promise<IAuthResponse> {
    const user = await this.userService.findOne({ email: body.email });

    const tokens = await this.tokenService.generateTokens(user);

    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    res.cookie('accessToken', tokens.accessToken, { httpOnly: true });

    return { email: body.email, nickname: user.nickname };
  }
}
