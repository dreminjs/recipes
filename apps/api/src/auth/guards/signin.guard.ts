import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PasswordService } from '../../password/password.service';
import { UserService } from '../../user/user.service';
import { SigninDto } from '../dto/signin.dto';

export class SigninGuard implements CanActivate {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly userService: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { password, email } = request.body as SigninDto;
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      user.hashPassword
    );

    if (!isPasswordValid) {
      throw new HttpException('Неверный пароль', HttpStatus.UNAUTHORIZED);
    }
    return isPasswordValid;
  }
}
