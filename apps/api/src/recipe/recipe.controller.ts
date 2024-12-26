import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe, User } from '@prisma/client';
import { RecipeService } from './recipe.service';
import { CurrentUser } from '../user';
import { RecipePhoto } from './recipe-photo.decorator';
import { AccessTokenGuard } from '../token';
import { GetRecipesQueryParameters } from './dto/get-recipes-query-parameters';
import { RecipesResponse } from 'interfaces';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  public async createOne(
    @Body() body: CreateRecipeDto,
    @CurrentUser() user: User,
    @RecipePhoto() photo: string
  ): Promise<Recipe> {
    const recipe = await this.recipeService.createOne({
      title: body.title,
      description: body.description,
      photo,
      ingredients: {
        createMany: {
          data: body.ingredients,
        },
      },
      steps: {
        createMany: {
          data: body.steps,
        },
      },
      user: {
        connect: { id: user.id },
      },
      holiday: {
        connect: { id: body.holidayId },
      },
      nationalCuisine: {
        connect: { id: body.nationalCuisineId },
      },
      type: {
        connect: { id: body.typeId },
      },
    });

    return recipe;
  }

  @Get()
  public async findMany(
    @Query()
    {
      typeId,
      holidayId,
      nationalCuisineId,
      cursor,
      take,
    }: GetRecipesQueryParameters
  ): Promise<RecipesResponse> {
    const recipes = await this.recipeService.findMany({
      where: {
        ...(typeId && { type: { id: typeId } }),
        ...(holidayId && { holiday: { id: holidayId } }),
        ...(nationalCuisineId && {
          nationalCuisine: { id: nationalCuisineId },
        }),
      },
      skip: cursor,
      take,
    });

    const nextCursor = recipes.length > 0 ? cursor + take : null;

    return {
      data: recipes,
      nextCursor
    }
  }


}
