import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user';
import { SigninDto } from './dto/signin.dto';
import { comparePassword } from './helpers/password.helper';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async validateUser({ email, password }: SigninDto): Promise<boolean> {
    const { hashPassword } = await this.userService.findOne({
      email,
    });

    if (!hashPassword) {
      throw new NotFoundException('Такого пользователя не существует!');
    }

    const isPasswordValid = comparePassword({ hashPassword, password });

    if (!isPasswordValid){
        throw new UnauthorizedException("Неверный пароль!")
    }

    return true
  }
}
