import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { SignupDto } from '../dto/signup.dto';

export class SignupGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { email } = context.switchToHttp().getRequest().body as SignupDto;

    const user = await this.userService.findOne({ email });

    if (user) {
      throw new HttpException(
        'Пользователь уже существует',
        HttpStatus.CONFLICT
      );
    }

    return true
  }
}
