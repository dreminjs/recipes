import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async createOne(dto: Prisma.UserCreateInput): Promise<User> {
    return await this.prisma.user.create({
      data: { ...dto },
    });
  }

  public async findOne(where: Prisma.UserWhereInput): Promise<User> {
    return await this.prisma.user.findFirst({
      where,
    });
  }

  public async updateOne(where: Prisma.UserWhereUniqueInput, dto: Prisma.UserUpdateInput): Promise<User> {
    return await this.prisma.user.update({ where, data: dto }); 
  }

}
