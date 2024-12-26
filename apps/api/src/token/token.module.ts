import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma';

@Module({
  imports: [JwtModule.register({}), PrismaModule],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
