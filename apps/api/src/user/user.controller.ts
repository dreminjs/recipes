import { Controller, Get, UseGuards } from '@nestjs/common';

import { AccessTokenGuard, RefreshTokenGuard } from '../token';

import { User } from '@prisma/client';

import { CurrentUser } from './decorators/current-user.decorator';

@Controller('users')
export class UserController {


  @Get('me')
  @UseGuards(RefreshTokenGuard)
  public async findMySelf(
    @CurrentUser()
    user: User
  ): Promise<User> {
    return user;
  }
}
