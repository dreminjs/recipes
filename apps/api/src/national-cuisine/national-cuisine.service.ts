import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { NationalCuisine, Prisma } from '@prisma/client';

@Injectable()
export class NationalCuisineService {
  constructor(private readonly prisma: PrismaService) {}

  async createOne(
    dto: Prisma.NationalCuisineCreateInput
  ): Promise<NationalCuisine> {
    return this.prisma.nationalCuisine.create({ data: dto });
  }

  async findMany(
    args: Prisma.NationalCuisineFindManyArgs = {}
  ): Promise<NationalCuisine[]> {
    return this.prisma.nationalCuisine.findMany(args);
  }

  async updateOne(
    where: Prisma.NationalCuisineWhereUniqueInput,
    dto: Prisma.NationalCuisineUpdateInput
  ): Promise<NationalCuisine> {
    return this.prisma.nationalCuisine.update({ where, data: dto });
  }

  async findOne(
    dto: Prisma.NationalCuisineFindFirstArgs = {}
  ): Promise<NationalCuisine> {
    return this.prisma.nationalCuisine.findFirst({ ...dto });
  }
}
