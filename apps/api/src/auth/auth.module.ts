import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { PasswordModule } from '../password/password.module';

@Module({
  imports: [PrismaModule, UserModule, PasswordModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
