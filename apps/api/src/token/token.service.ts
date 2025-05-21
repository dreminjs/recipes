import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokenPayload, ITokens } from './token.interface';
import { PrismaService } from '../prisma';
import { Prisma, RefreshToken } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  public async deleteOne(
    args: Prisma.RefreshTokenDeleteArgs
  ): Promise<RefreshToken> {
    return await this.prisma.refreshToken.delete(args);
  }

  public async generateTokens(payload: ITokenPayload): Promise<ITokens> {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.configService.get('ACCESS_TOKEN'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '1w',
      secret: this.configService.get('REFRESH_TOKEN'),
    });

    await this.saveRefreshToken({
      user: { connect: { email: payload.email } },
      token: refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async validateToken(token: string): Promise<ITokenPayload> {
    return this.jwtService.verify(token);
  }

  private async saveRefreshToken(
    payload: Prisma.RefreshTokenCreateInput
  ): Promise<RefreshToken> {
    return await this.prisma.refreshToken.create({ data: payload });
  }

  public async deleteRefreshToken(where: Prisma.RefreshTokenWhereUniqueInput) {
    return await this.prisma.refreshToken.delete({ where });
  }
}
