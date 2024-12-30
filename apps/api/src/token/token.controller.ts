import { Controller, Get, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../user';
import { User } from '@prisma/client';
import { TokenService } from './token.service';
import { ITokens } from './token.interface';
import { AccessTokenGuard } from './guards/access-token.guard';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  // @UseGuards(AccessTokenGuard)
  // @Get()
  // public async index(@CurrentUser() user: User): Promise<ITokens> {
  //   return await this.tokenService.generateTokens(user);
//  }
}
