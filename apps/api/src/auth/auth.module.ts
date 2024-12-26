import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { PasswordModule } from '../password/password.module';
import { TokenModule } from '../token/token.module';
import { SignupGuard } from './guards/signup.guard';

@Module({
  imports: [PrismaModule, UserModule, PasswordModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, SignupGuard, SignupGuard]
})
export class AuthModule {}
