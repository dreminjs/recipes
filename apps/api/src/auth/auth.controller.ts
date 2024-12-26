import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  @Post()
  public async signup(@Body() body: SignupDto): Promise<User> {
    
  }

  @Post()
  public async signin(@Body() body: SigninDto): Promise<User> {
    
  }
}
