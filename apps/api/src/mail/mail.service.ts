import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';
import { ISendEmailConfirmMailDto } from './dto/send-mail-confirm-email.dto';
import { join } from 'node:path';
import { ISendPasswordResetMailDto } from './dto/send-password-reset-mail.dto';
import { ISendTwoFaConfirmMailDto } from './dto/send-request-two-fa-confirm.dto';
import { SendTwoFaSecretDto } from './dto/send-two-fa-secret.dto';
import { UserService } from '../user';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private userService: UserService
  ) {}

  public async sendConfirmationEmail({
    user: { email, nickname },
    urlConfirmAddress,
  }: ISendEmailConfirmMailDto): Promise<SentMessageInfo> {
    await this.userService.updateOne(
      {
        email,
      },
      { isActived: null, link: urlConfirmAddress }
    );

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
        console.log(e);
        throw new HttpException(
          `Ошибка работы почты: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      });
  }

  public async sendRequestEnableTwoFa({
    id,
    nickname,
    email,
  }: ISendTwoFaConfirmMailDto): Promise<SentMessageInfo> {
    return await this.mailerService
      .sendMail({
        to: email,
        subject: '2fa',
        template: join(
          __dirname,
          '../../../apps/api/templates/enable-2fa-confirm.ejs'
        ),
        context: {
          nickname,
          userId: id,
        },
      })
      .catch((e) => {
        console.log(e);
        throw new HttpException(
          `Ошибка работы почты: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      });
  }

  public async sendTwoFaSecret({
    nickname,
    email,
    secret,
  }: SendTwoFaSecretDto): Promise<SentMessageInfo> {
    return await this.mailerService
      .sendMail({
        to: email,
        subject: '2fa',
        template: join(__dirname, '../../../apps/api/templates/2fa-secret.ejs'),
        context: {
          nickname,
          secret,
        },
      })
      .catch((e) => {
        console.log(e);
        throw new HttpException(
          `Ошибка работы почты: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      });
  }

  public async sendRequestDisableTwoFa({
    id,
    nickname,
    email,
  }: ISendTwoFaConfirmMailDto): Promise<SentMessageInfo> {
    return await this.mailerService
      .sendMail({
        to: email,
        subject: '2fa',
        template: join(
          __dirname,
          '../../../apps/api/templates/disable-2fa-confirm.ejs'
        ),
        context: {
          nickname,
          userId: id,
        },
      })
      .catch((e) => {
        console.log(e);
        throw new HttpException(
          `Ошибка работы почты: ${JSON.stringify(e)}`,
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      });
  }

  public async sendResetPasswordMail(
    dto: ISendPasswordResetMailDto,
    token: string
  ): Promise<SentMessageInfo> {
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
