import { Controller, Get, Logger, UseGuards } from '@nestjs/common';

import { AccessTokenGuard } from '../token';

import { User } from '@prisma/client';

import { CurrentUser } from './decorators/current-user.decorator';
import { IUserResponse } from 'interfaces';

@Controller('user')
export class UserController {
  @Get()
  @UseGuards(AccessTokenGuard)
  public async index(
    @CurrentUser() { email, role, isActived, nickname }: User
  ): Promise<IUserResponse> {
    return { email, role, isActived, nickname };
  }
}
