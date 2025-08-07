import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FavoriteRecipe, Recipe, User } from '@prisma/client';
import { RecipeService } from './recipe.service';
import { CurrentUser } from '../user';
import { MinioFileNames } from '../minio-client/minio-file-name.decorator';
import { AccessTokenGuard } from '../token';
import { GetRecipesQueryParameters } from './dto/get-recipes-query-parameters';
import { IInfiniteScrollResponse } from 'interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioFileUploadInterceptor } from '../minio-client/minio-file-upload.interceptor';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { MinioClientService } from '../minio-client/minio-client.service';

@Controller('recipes')
export class RecipeController {
  constructor(
    private readonly recipeService: RecipeService,
    private readonly minioClientService: MinioClientService
  ) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'), MinioFileUploadInterceptor)
  public async createOne(
    @Body() body: CreateRecipeDto,
    @CurrentUser('id') userId: string,
    @MinioFileNames() fileNames: string[]
  ): Promise<Recipe> {
    const recipe = await this.recipeService.createOne({
      title: body.title,
      description: body.description,
      photos: fileNames,
      recipeIngredient: { createMany: { data: [] } },
      steps: {
        createMany: {
          data: body.steps,
        },
      },
      user: {
        connect: { id: userId },
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

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'), MinioFileUploadInterceptor)
  public async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateRecipeDto,
    @CurrentUser('id') userId: string,
    @MinioFileNames() fileNames?: string[]
  ): Promise<Recipe> {

    await this.minioClientService.deleteMany(body?.removedPictures)

    const recipe = await this.recipeService.updateOne({
      title: body.title,
      description: body.description,
      photos: body.pictures,
      recipeIngredient: { createMany: { data: [] } },
      steps: {
        createMany: {
          data: [],
        },
      },
      user: {
        connect: { id: userId },
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
    }, { id });

    return recipe;
  }

  @Get()
  public async findMany(
    @Query()
    {
      title,
      cursor = 0,
      take = 10,
      typeIds,
      nationalCuisineIds,
      holidayIds,
    }: GetRecipesQueryParameters
  ): Promise<IInfiniteScrollResponse<Recipe>> {
    const recipes = await this.recipeService.findMany({
      where: {
        ...(typeIds && {
          type: { id: typeIds instanceof Array ? { in: typeIds } : typeIds },
        }),
        ...(holidayIds && {
          id: holidayIds instanceof Array ? { in: holidayIds } : holidayIds,
        }),
        ...(nationalCuisineIds && {
          id:
            nationalCuisineIds instanceof Array
              ? { in: nationalCuisineIds }
              : nationalCuisineIds,
        }),
        ...(title && { title: { contains: title } }),
      },
      include: { recipeIngredient: { include: { ingredient: true } } },
      skip: cursor,
      take,
    });

    const nextCursor = recipes.length > 0 ? cursor + take : null;

    return {
      items: recipes,
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
