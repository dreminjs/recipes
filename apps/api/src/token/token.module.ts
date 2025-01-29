import { forwardRef, Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma';
import { UserModule } from '../user';
import { ConfigService } from '@nestjs/config';
import { TokenController } from './token.controller';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';

@Module({
  imports: [JwtModule.register({}), PrismaModule, forwardRef(() => UserModule)],
  providers: [
    TokenService,
    AccessTokenStrategy,
    ConfigService,
    RefreshTokenStrategy,
  ],
  exports: [TokenService, AccessTokenStrategy],
  controllers: [TokenController],
})
export class TokenModule {}