import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { JwtService } from '@nestjs/jwt';
import { PasswordResetToken, Prisma, User } from '@prisma/client';
import { UserService } from '../user';
import { MailService } from '../mail/mail.service';

@Injectable()
export class PasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailService: MailService
  ) {}

  async findOne(args: Prisma.PasswordResetTokenFindFirstArgs) {
    return await this.prisma.passwordResetToken.findFirst(args);
  }

  async findOneAndDelete(userId: string) {
    const token = await this.findOne({ where: { user: { id: userId } } });

    if(token){
      this.deleteOne(token.userId)
    }

  }

  async deleteOne(userId: string): Promise<void> {
    const token = await this.prisma.passwordResetToken.delete({
      where: { userId },
    });

    if (token) {
      await this.deleteOne(userId);
    }
  }

  async createResetRequest({
    id: userId,
    email,
    nickname,
  }: Pick<User, 'email' | 'nickname' | 'id'>): Promise<PasswordResetToken> {
    const token = this.jwtService.sign({ sub: userId }, { expiresIn: '15m' });

    const prevPasswordResetToken = await this.findOne({ where: { userId } });

    if (prevPasswordResetToken) {
      await this.deleteOne(userId);
    }

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    const createPasswordResetToken =
      await this.prisma.passwordResetToken.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          token,
          expiresAt,
        },
      });

    await this.mailService.sendResetPasswordMail(
      { email, nickname },
      createPasswordResetToken.token
    );

    await this.userService.updateOne(
      {
        email,
      },
      { isTwoFactorEnabled: null }
    );

    return createPasswordResetToken;
  }
}
