import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';
import { ISendEmailConfirmMailDto } from './dto/send-mail-confirm-mail.dto';
import { join } from 'node:path';
import { ISendPasswordResetMailDto } from './dto/send-password-reset-mail.dto';



@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendConfirmationEmail({
    user: { email, nickname },
    urlConfirmAddress,
  }: ISendEmailConfirmMailDto): Promise<SentMessageInfo> {
    return await this.mailerService
      .sendMail({
        to: email,
        subject: 'подтверждение почты',
        template: join(
          __dirname,
          '../../../apps/api/templates/email-confirm.ejs'
        ),
        context: {
          nickname,
          urlConfirmAddress,
        },
      })
      .catch((e) => {
        console.log(e)
        throw new HttpException(
          `Ошибка работы почты: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      });
  }


  public async sendResetPasswordMail(dto: ISendPasswordResetMailDto, token: string) {
    return await this.mailerService
    .sendMail({
      to: dto.email,
      subject: 'сброс пароля',
      template: join(
        __dirname,
        '../../../apps/api/templates/reset-password-confirm.ejs'
      ),
      context: {
        nickname: dto.nickname,
        token,
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
