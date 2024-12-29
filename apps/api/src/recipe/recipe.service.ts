import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma';
import { FavoriteRecipe, Prisma, Recipe } from '@prisma/client';

@Injectable()
export class RecipeService {
  constructor(private readonly prisma: PrismaService) {}

  public async createOne(dto: Prisma.RecipeCreateInput) {
    return await this.prisma.recipe.create({ data: dto });
  }

  public async findOne(where: Prisma.RecipeWhereInput): Promise<Recipe> {
    return await this.prisma.recipe.findFirst({ where });
  }

  public async findMany(args: Prisma.RecipeFindManyArgs): Promise<Recipe[]> {
    return await this.prisma.recipe.findMany(args);
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

  public async favorite(data: Prisma.FavoriteRecipeCreateInput) : Promise<FavoriteRecipe> {
    return await this.prisma.favoriteRecipe.create({data});
  }
  
  public async unfavorite(data: Prisma.FavoriteRecipeWhereUniqueInput) : Promise<FavoriteRecipe> {
    return await this.prisma.favoriteRecipe.delete({where: data});
  }

  public async findManySelections(countSelections: number): Promise<Recipe[]> {


    const data = []

    for (let i = 0; i < countSelections; i++) {
      const recipes = await this.prisma.recipe.findMany({})
      data.push(recipes)
    }


  }


}
