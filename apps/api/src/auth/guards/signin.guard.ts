import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PasswordService } from '../../password/password.service';
import { UserService } from '../../user';
import { SigninDto } from '../dto/signin.dto';

@Injectable()
export class SigninGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { email, password } = context.switchToHttp().getRequest()
      .body as SigninDto;

    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      user.hashPassword
    );
    if (!isPasswordValid) {
      throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
