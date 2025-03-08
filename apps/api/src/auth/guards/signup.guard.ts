import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../../user';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class SignupGuard implements CanActivate {
  constructor(private readonly userService: UserService) {};

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { email } = context.switchToHttp().getRequest().body as SignupDto;

    const user = await this.userService.findOne({ email });
    
    if (user) {
      throw new HttpException(
        'Пользователь уже существует',
        HttpStatus.CONFLICT
      );
    }

    return true;
  }
}
