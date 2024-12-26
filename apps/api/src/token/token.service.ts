import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload, ITokens } from './token.interface';
import { PrismaService } from '../prisma';
import { Prisma, RefreshToken } from '@prisma/client';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) {}

  public async generateTokens(payload: ITokenPayload): Promise<ITokens> {
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1d',secret: process.env.ACCESS_TOKEN });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1w',secret: process.env.REFRESH_TOKEN });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async validateAccessToken(token: string): Promise<ITokenPayload> {
    return this.jwtService.verify(token);
  }

  public async validateRefreshToken(token: string): Promise<ITokenPayload> {
    return this.jwtService.verify(token);
  }

  public async saveRefreshToken(
    payload: Prisma.RefreshTokenCreateInput
  ): Promise<RefreshToken> {
    return await this.prisma.refreshToken.create({ data: payload });
  }
}
