import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  @Get()
  public async index(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
