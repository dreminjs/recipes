import { Injectable } from '@nestjs/common';
import { Prisma, Holiday } from '@prisma/client';
import { PrismaService } from '../prisma';

@Injectable()
export class HolidayService {
  constructor(private readonly prisma: PrismaService) {}

  public async findMany(
    args: Prisma.HolidayFindManyArgs = {}
  ): Promise<Holiday[]> {
    return await this.prisma.holiday.findMany(args);
  }

  public async findOne(
    dto: Prisma.HolidayFindFirstArgs = {}
  ): Promise<Holiday> {
    return await this.prisma.holiday.findFirst({ ...dto });
  }

  public async createOne(dto: Prisma.HolidayCreateInput): Promise<Holiday> {
    return await this.prisma.holiday.create({ data: dto });
  }

  public async updateOne(
    where: Prisma.HolidayWhereUniqueInput,
    dto: Prisma.HolidayUpdateInput
  ): Promise<Holiday> {
    return await this.prisma.holiday.update({ where, data: dto });
  }

  public async deleteOne(where: Prisma.HolidayWhereUniqueInput): Promise<void> {
    await this.prisma.holiday.delete({ where });
  }
}
