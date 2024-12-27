import { Injectable } from '@nestjs/common';
import { Prisma, RecipeComment } from '@prisma/client';
import { PrismaService } from '../prisma';

@Injectable()
export class RecipeCommentService {

    constructor(
        private readonly prisma: PrismaService
    ) {}

    public async createOne(data: Prisma.RecipeCommentCreateInput): Promise<RecipeComment> {
        return await this.prisma.recipeComment.create({data});
    }

    public async findMany(args: Prisma.RecipeCommentFindManyArgs): Promise<RecipeComment[]> {
        return await this.prisma.recipeComment.findMany(args);
    }

    public async findOne(where: Prisma.RecipeCommentWhereInput): Promise<RecipeComment> {
        return await this.prisma.recipeComment.findFirst({where});
    }

    public async updateOne(where: Prisma.RecipeCommentWhereUniqueInput, data: Prisma.RecipeCommentUpdateInput): Promise<RecipeComment> {
        return await this.prisma.recipeComment.update({where, data});
    }


}
