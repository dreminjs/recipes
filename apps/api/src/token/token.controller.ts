import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { TokenService } from './token.service';
import { ITokens } from './token.interface';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Response } from 'express';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @UseGuards(RefreshTokenGuard)
  @Get()
  public async index(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response
  ): Promise<ITokens> {
    const tokens = await this.tokenService.generateTokens(user);

    res.cookie("accessToken", tokens.accessToken, {
      httpOnly: true
    })

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true
    })

    return tokens;
  }
}
