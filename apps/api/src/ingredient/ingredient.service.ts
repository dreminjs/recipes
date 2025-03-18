import { Injectable } from '@nestjs/common';
import { Ingredient, IngredientRequest, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma';

@Injectable()
export class IngredientService {
  constructor(private readonly prisma: PrismaService,) {}

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

  public async deleteRequest(args: Prisma.IngredientRequestDeleteArgs): Promise<void> {
    await this.prisma.ingredientRequest.delete(args)
  }

  public async findRequest(args: Prisma.IngredientRequestFindFirstArgs) {
    return await this.prisma.ingredientRequest.findFirst(args)
  }

  public async count(args: Prisma.IngredientCountArgs): Promise<number> {
    return await this.prisma.ingredient.count(args);
  }

  public async updateOne(data:Prisma.IngredientUpdateInput,where:Prisma.IngredientWhereUniqueInput): Promise<Ingredient> {
    return await this.prisma.ingredient.update({data,where})
  }

  public async deleteMany(args:Prisma.IngredientDeleteManyArgs): Promise<void> {
    await this.prisma.ingredient.deleteMany(args)
  }

}
