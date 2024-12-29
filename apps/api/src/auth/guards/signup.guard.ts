import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { UserService } from '../../user';
import { SignupDto } from '../dto/signup.dto';

@Injectable()
export class SignupGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  private logger = new Logger(SignupGuard.name);

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
