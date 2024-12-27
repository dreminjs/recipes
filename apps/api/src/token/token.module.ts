import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma';
import { UserModule } from '../user';
import { ConfigModule } from '@nestjs/config';
import { TokenController } from './token.controller';

@Module({
  imports: [JwtModule.register({}), PrismaModule, UserModule, ConfigModule],
  providers: [TokenService],
  exports: [TokenService],
  controllers: [TokenController],
})
export class TokenModule {}
