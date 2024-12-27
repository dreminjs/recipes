import { Controller, Get, UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { CurrentUser } from '../user';
import { User } from '@prisma/client';
import { TokenService } from './token.service';
import { ITokens } from './token.interface';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @UseGuards(RefreshTokenGuard)
  @Get('')
  public async index(@CurrentUser() user: User): Promise<ITokens> {
    return await this.tokenService.generateTokens(user);
  }
}
