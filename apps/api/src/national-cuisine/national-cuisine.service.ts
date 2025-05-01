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



async updateMany(
  updates: Array<{ id: string; data: Prisma.NationalCuisineUpdateInput }>,
): Promise<NationalCuisine[]> {
  return this.prisma.$transaction(
    updates.map(({ id, data }) =>
      this.prisma.nationalCuisine.update({
        where: { id },
        data,
      }),
    ),
  );
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

  async deleteOne(
    where: Prisma.NationalCuisineWhereUniqueInput
  ): Promise<NationalCuisine> {
    return this.prisma.nationalCuisine.delete({ where });
  }

  async count(args: Prisma.NationalCuisineCountArgs = {}): Promise<number> {
    return await this.prisma.nationalCuisine.count(args)
  }

  async deleteMany(args: Prisma.NationalCuisineDeleteManyArgs): Promise<void> {
    await this.prisma.nationalCuisine.deleteMany(args)
  }
 }
