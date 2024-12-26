import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerOptions } from '@nestjs-modules/mailer';

export const getMailConfig = async (
  configService: ConfigService
): Promise<MailerOptions> => {

  return {
    transport:{
      host: configService.get<string>("MAIL_HOST") || "smtp.gmail.com",
      port: configService.get<number>("MAIL_PORT"),
      secure: true,
      auth:{
        user: configService.get<string>("USER_APP_EMAIL"),
        pass: configService.get<string>("USER_APP_PASS")
      }
    },
    defaults: {
      from: `Forum About Recipes :)`,
    },
    template: {
      adapter: new EjsAdapter(),
      options: {
        strict: false,
      },
    },
  };
};
