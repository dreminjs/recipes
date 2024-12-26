import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma';
import { UserModule } from '../user';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JwtModule.register({}), PrismaModule, UserModule, ConfigModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
