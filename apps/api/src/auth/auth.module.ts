import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { PasswordModule } from '../password/password.module';
import { TokenModule } from '../token/token.module';
import { MailModule } from '../mail/mail.module';
@Module({
  imports: [UserModule, PrismaModule, PasswordModule, TokenModule, MailModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
