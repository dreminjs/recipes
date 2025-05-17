import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PrismaModule } from '../prisma';
import { TokenModule } from '../token';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    TokenModule,
    JwtModule.register({
      secret: process.env.PASSWORD_REQUEST_TOKEN,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}
