import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth';
import { PasswordModule } from '../password/password.module';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user';

@Module({
  imports: [PrismaModule, TokenModule, UserModule, AuthModule, PasswordModule],
})
export class AppModule {}
