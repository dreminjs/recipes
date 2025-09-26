import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { TokenService } from './token.service';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { Response } from 'express';
import { IStandardResponse } from 'interfaces';

@Controller('tokens')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  @UseGuards(RefreshTokenGuard)
  public async index(
    @CurrentUser('id') userId: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<IStandardResponse> {
    return await this.tokenService.generateTokens({ userId }, res);
    }
}
