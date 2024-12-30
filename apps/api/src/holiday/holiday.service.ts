import { Injectable } from '@nestjs/common';
import { Prisma, Holiday } from '@prisma/client';
import { PrismaService } from '../prisma';

@Injectable()
export class HolidayService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    public async findMany(where: Prisma.HolidayWhereInput = {}): Promise<Holiday[]> {
        return await this.prisma.holiday.findMany({ where });
    }

    public async findOne(dto: Prisma.HolidayFindFirstArgs = {}): Promise<Holiday> {
        return await this.prisma.holiday.findFirst({ ...dto });
    }

    public async createOne(dto: Prisma.HolidayCreateInput): Promise<Holiday> {
        return await this.prisma.holiday.create({ data: dto });
    }

    public async updateOne(where: Prisma.HolidayWhereUniqueInput, dto: Prisma.HolidayUpdateInput): Promise<Holiday> {
        return await this.prisma.holiday.update({ where, data: dto });
    }
}
