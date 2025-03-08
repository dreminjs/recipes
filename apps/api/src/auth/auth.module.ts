import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';
import { MailModule } from '../mail/mail.module';
@Module({
  imports: [UserModule, PrismaModule, TokenModule, MailModule],
  controllers: [AuthController],
})
export class AuthModule {}
