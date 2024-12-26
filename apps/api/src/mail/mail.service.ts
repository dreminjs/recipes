import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { join } from 'path';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail({
    user: { email, id, nickname },
    urlConfirmAddress,
  }: {
    user: User;
    urlConfirmAddress: string;
  }) {
    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'Подтверждение регистрации',
        template: join(
          __dirname,
          '../../../apps/api/templates/email-confirm.ejs'
        ),
        context: {
          id: id,
          username: nickname,
          urlConfirmAddress,
        },
      })
      .catch((e) => {
        throw new HttpException(
          `Ошибка работы почты: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      });
  }
}
