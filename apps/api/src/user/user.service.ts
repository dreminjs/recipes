import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async createOne(@Body() body: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: { ...body },
    });
  }

  public async findOne(where: Prisma.UserWhereInput ): Promise<User> {
    return await this.prisma.user.findFirst({
      where,
    });
  }
}
