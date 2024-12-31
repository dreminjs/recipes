import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma';
import { Type } from '@prisma/client';

@Injectable()
export class TypeService {
  constructor(private readonly prisma: PrismaService) {}

  public async findMany(
    args: Prisma.TypeFindManyArgs = {}
  ): Promise<Type[]> {
    return await this.prisma.type.findMany(args);
  }

  public async updateOne(
    where: Prisma.TypeWhereUniqueInput,
    dto: Prisma.TypeUpdateInput
  ): Promise<Type> {
    return await this.prisma.type.update({ data: dto, where });
  }

  public async createOne(dto: Prisma.TypeCreateInput): Promise<Type> {
    return await this.prisma.type.create({ data: dto });
  }

  public async findOne(dto: Prisma.TypeFindFirstArgs = {}): Promise<Type> {
    return await this.prisma.type.findFirst({ ...dto });
  }
}
