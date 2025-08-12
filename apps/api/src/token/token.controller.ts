import { Controller, Get, Logger, Res, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { TokenService } from './token.service';
import { ITokens } from './token.interface';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Response } from 'express';

@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  private logger = new Logger(TokenController.name)

  @Get()
  @UseGuards(RefreshTokenGuard)
  public async index(
    @CurrentUser('id') userId: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<ITokens> {

    const tokens = await this.tokenService.generateTokens({ userId });

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
    });

    return tokens;
  }
}
