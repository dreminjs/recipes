import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { JwtService } from '@nestjs/jwt';
import { PasswordResetToken, Prisma } from '@prisma/client';

@Injectable()
export class PasswordService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async findOne(args: Prisma.PasswordResetTokenFindFirstArgs) {
    return await this.prisma.passwordResetToken.findFirst(args);
  }

  async deleteOne(userId: string): Promise<void> {
    await this.prisma.passwordResetToken.delete({ where: { userId } });
  }

  async createResetRequest(userId: string): Promise<PasswordResetToken> {
    const token = this.jwtService.sign({ sub: userId }, { expiresIn: '15m' });

    const prevPasswordResetToken = await this.findOne({ where: { userId } });

    if (prevPasswordResetToken) {
      await this.deleteOne(userId);
    }

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    return await this.prisma.passwordResetToken.create({
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
  }
}
