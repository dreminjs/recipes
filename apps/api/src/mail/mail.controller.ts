import { Controller, Post, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { CurrentUser } from '../user';
import * as speakeasy from 'speakeasy';
import { IStandardResponse } from 'interfaces';
import { AccessTokenGuard } from '../token';
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('resend')
  @UseGuards(AccessTokenGuard)
  public async resend(
    @CurrentUser('email') email: string,
    @CurrentUser('nickname') nickname: string
  ): Promise<IStandardResponse> {
    const token = speakeasy.generateSecret({
      length: 5,
    });

    await this.mailService.sendConfirmationEmail({
      user: {
        email,
        nickname,
      },
      urlConfirmAddress: token.ascii,
    });

    return {
        message: "Письмо отправлено",
        success: true
    }
  }
}
