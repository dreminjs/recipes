import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer/dist/mailer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMailConfig } from './mail.config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailConfig,
    }),
    ConfigModule
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
