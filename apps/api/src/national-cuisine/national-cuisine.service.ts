import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { NationalCuisine, Prisma } from '@prisma/client';

@Injectable()
export class NationalCuisineService {
    constructor(
        private readonly prisma: PrismaService
    ){}

    async createOne(dto: Prisma.NationalCuisineCreateInput): Promise<NationalCuisine> {
        return this.prisma.nationalCuisine.create({ data: dto });
    }

    async findMany(where: Prisma.NationalCuisineWhereInput = {}): Promise<NationalCuisine[]> {
        return this.prisma.nationalCuisine.findMany({ where });
    }

    async updateOne(where: Prisma.NationalCuisineWhereUniqueInput, dto: Prisma.NationalCuisineUpdateInput): Promise<NationalCuisine> {
        return this.prisma.nationalCuisine.update({ where, data: dto });
    }

    async findOne(where: Prisma.NationalCuisineWhereUniqueInput): Promise<NationalCuisine> {
        return this.prisma.nationalCuisine.findUnique({ where });
    }

}

