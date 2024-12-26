import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { Prisma, Recipe } from '@prisma/client';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}

  public async createOne(dto: Prisma.RecipeCreateInput) {
    return await this.prisma.recipe.create({ data: dto });
  }

  public async findOne(where: Prisma.RecipeWhereInput): Promise<Recipe> {
    return await this.prisma.recipe.findFirst({ where });
  }

  public async findMany(where: Prisma.RecipeWhereInput): Promise<Recipe[]> {
    return await this.prisma.recipe.findMany({ where });
  }

  public async updateOne(
    dto: Prisma.RecipeUpdateInput,
    where: Prisma.RecipeWhereUniqueInput
  ): Promise<Recipe> {
    return await this.prisma.recipe.update({ where, data: dto });
  }

  public async deleteOne(where: Prisma.RecipeWhereUniqueInput): Promise<void> {
    await this.prisma.recipe.delete({ where });
  }
}
