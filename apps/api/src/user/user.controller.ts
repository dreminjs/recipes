import { Controller, Get, UseGuards } from '@nestjs/common';

import { RefreshTokenGuard } from '../token';

import { CurrentUser } from './decorators/current-user.decorator';

import { User } from "@prisma/client"

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
