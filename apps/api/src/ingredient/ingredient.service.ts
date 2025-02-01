import { Injectable } from '@nestjs/common';
import { Ingredient, IngredientRequest, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma';

@Injectable()
export class IngredientService {
  constructor(private readonly prisma: PrismaService) {}

  public async findMany(
    args: Prisma.IngredientFindManyArgs = {}
  ): Promise<Ingredient[]> {
    return await this.prisma.ingredient.findMany(args);
  }

  public async findOne(
    where: Prisma.IngredientWhereInput
  ): Promise<Ingredient> {
    return await this.prisma.ingredient.findFirst({ where });
  }

  public async createOne(
    dto: Prisma.IngredientCreateInput
  ): Promise<Ingredient> {
    return await this.prisma.ingredient.create({ data: dto });
  }

  public async createRequest(
    dto: Prisma.IngredientRequestCreateInput
  ): Promise<IngredientRequest> {
    return await this.prisma.ingredientRequest.create({ data: dto });
  }
  public async count(args: Prisma.IngredientCountArgs): Promise<number> {
    return await this.prisma.ingredient.count(args);
  }
}
