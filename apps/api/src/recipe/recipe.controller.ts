import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FavoriteRecipe, Recipe, User } from '@prisma/client';
import { RecipeService } from './recipe.service';
import { CurrentUser } from '../user';
import { RecipePhoto } from './recipe-photo.decorator';
import { AccessTokenGuard } from '../token';
import { GetRecipesQueryParameters } from './dto/get-recipes-query-parameters';
import { InfiniteScrollResponse } from 'interfaces';
import { HolidayService } from '../holiday/holiday.service';
import { NationalCuisineService } from '../national-cuisine/national-cuisine.service';
import { GetRecipesSelectionQueryParameters } from './dto/get-recipes-selection-query-parameters.ts';
import { TypeService } from '../type/type.service';
import { create } from 'domain';

@Controller('recipe')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly holidayService: HolidayService,
    private readonly nationalCuisineService: NationalCuisineService,
    private readonly typeService: TypeService
  ) {}

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

  @Get('selection')
  public async findSelection(
    @Query()
    {
      typeId,
      holidayId,
      nationalCuisineId,
      cursor,
      take,
      title,
    }: GetRecipesQueryParameters
  ): Promise<InfiniteScrollResponse<Recipe>> {
    const recipes = await this.recipeService.findMany({
      where: {
        ...(typeId && { type: { id: typeId } }),
        ...(holidayId && { holiday: { id: holidayId } }),
        ...(nationalCuisineId && {
          nationalCuisine: { id: nationalCuisineId },
        }),
        title: { contains: title },
      },
      skip: cursor,
      take,
    });

    const nextCursor = recipes.length > 0 ? cursor + take : null;

    return {
      data: recipes,
      nextCursor,
    };
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
  ): Promise<InfiniteScrollResponse<Recipe>> {
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

  @Get('selection')
  public async findAll(
    @Query()
    { isType, isNationalCuisine, isHoliday }: GetRecipesSelectionQueryParameters
  ): Promise<Recipe[]> {
    let type, nationalCuisine, holiday;

    // НУЖНО ОТСЛЫЛАТЬ КОНКРЕТНЫЙ ТИП И ТД

    if (isType) {
      type = await this.typeService.findOne();
    }

    if (isNationalCuisine) {
      nationalCuisine = await this.nationalCuisineService.findOne();
    }

    if (isHoliday) {
      holiday = await this.holidayService.findOne();
    }

    return await this.recipeService.findMany({
      where: {
        ...(isType && { typeId: type.id }),
        ...(isNationalCuisine && { nationalCuisineId: nationalCuisine.id }),
        ...(isHoliday && { holidayId: holiday.id }),
      },
    });
  }
}
