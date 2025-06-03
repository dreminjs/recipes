import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user';
import { SigninDto } from './dto/signin.dto';
import { comparePassword } from './helpers/password.helper';
import { TokenService } from '../token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {}

  public async validateUser({ email, password }: SigninDto): Promise<boolean> {
    const { hashPassword } = await this.userService.findOne({
      email,
    });

    if (!hashPassword) {
      throw new NotFoundException('Такого пользователя не существует!');
    }

    const isPasswordValid = comparePassword({ hashPassword, password });

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный пароль!');
    }

    const token = await this.tokenService.findOne({ user: { email } });

    if (token) {
      await this.tokenService.deleteRefreshToken({ id: token.id });
    }

    return true;
  }
}
