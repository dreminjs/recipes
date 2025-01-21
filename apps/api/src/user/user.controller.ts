import { Controller, Get, Logger, UseGuards } from '@nestjs/common';

import { AccessTokenGuard } from '../token';

import { User } from '@prisma/client';

import { CurrentUser } from './decorators/current-user.decorator';

@Controller('user')
export class UserController {
  @Get()
  @UseGuards(AccessTokenGuard)
  public async index(@CurrentUser() user: User) {
    return user;
  }
}
