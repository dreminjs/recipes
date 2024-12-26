import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { IAuthResponse } from 'interfaces';

@Controller('auth')
export class AuthController {
  @Post()
  public async signup(@Body() body: SignupDto): Promise<IAuthResponse> {}

  @Post()
  public async signin(@Body() body: SigninDto): Promise<IAuthResponse> {}
}
