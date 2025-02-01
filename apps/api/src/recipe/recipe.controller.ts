import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FavoriteRecipe, Recipe, User } from '@prisma/client';
import { RecipeService } from './recipe.service';
import { CurrentUser } from '../user';
import { RecipePhoto } from './recipe-photo.decorator';
import { AccessTokenGuard } from '../token';
import { GetRecipesQueryParameters } from './dto/get-recipes-query-parameters';
import { IInfiniteScrollResponse } from 'interfaces';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  public async createOne(
    @Body() body: CreateRecipeDto,
    @CurrentUser() user: User,
    @RecipePhoto() photo: string
  ): Promise<Recipe> {
    const recipe = await this.recipeService.createOne({
      title: body.title,
      description: body.description,
      photo,
      recipeIngredient: { createMany: { data: body.recipeIngredients } },
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
      title,
    }: GetRecipesQueryParameters
  ): Promise<IInfiniteScrollResponse<Recipe>> {
    const recipes = await this.recipeService.findMany({
      where: {
        ...(typeId && { type: { id: typeId } }),
        ...(holidayId && { holiday: { id: holidayId } }),
        ...(nationalCuisineId && {
          nationalCuisine: { id: nationalCuisineId },
        }),
        title: { contains: title },
      },
      include: { recipeIngredient: { include: { ingredient: true } } },
      skip: cursor,
      take,
    });

    const nextCursor = recipes.length > 0 ? cursor + take : null;

    return {
      data: recipes,
      nextCursor,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Post('favorite/:recipeId')
  public async favorite(
    @CurrentUser() user: User,
    @Param('recipeId') recipeId: string
  ): Promise<FavoriteRecipe> {
    return await this.recipeService.favorite({
      user: { connect: { id: user.id } },
      recipe: { connect: { id: recipeId } },
    });
  }

  @UseGuards(AccessTokenGuard)
  @Delete('unfavorite/:id')
  public async unfavorite(
    @Param('id') recipeId: string
  ): Promise<FavoriteRecipe> {
    return await this.recipeService.unfavorite({
      id: recipeId,
    });
  }
}
