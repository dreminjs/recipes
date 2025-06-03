import { Controller, Get, UseGuards } from '@nestjs/common';

import { AccessTokenGuard } from '../token';

import { User } from '@prisma/client';

import { CurrentUser } from './decorators/current-user.decorator';
import { IUserResponse } from 'interfaces';

@Controller('users')
export class UserController {
  @Get('me')
  @UseGuards(AccessTokenGuard)
  public async findMySelf(
    @CurrentUser()
    {
      email,
      role,
      isActived,
      nickname,
      id,
      twoFactorSecret,
      isTwoFactorEnabled,
    }: User
  ): Promise<IUserResponse> {
    return {
      email,
      role,
      isActived,
      nickname,
      id,
      isTwoFactorEnabled,
      twoFactorSecret,
    };
  }
}
