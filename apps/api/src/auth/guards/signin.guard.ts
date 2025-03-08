import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../../user';
import { SigninDto } from '../dto/signin.dto';
import { comparePassword } from '../helpers/password.helper';

@Injectable()
export class SigninGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { email, password } = context.switchToHttp().getRequest()
      .body as SigninDto;

    const { hashPassword } = await this.userService.findOne({ email });

    if (!hashPassword) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await comparePassword(password, hashPassword);
    if (!isPasswordValid) {
      throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
