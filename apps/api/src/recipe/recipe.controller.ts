import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { FavoriteRecipe, Prisma, Recipe, User } from '@prisma/client';
import { RecipeService } from './recipe.service';
import { CurrentUser } from '../user';
import { AccessTokenGuard } from '../token';
import { GetRecipesQueryParameters } from './dto/get-recipes-query-parameters';
import { IInfiniteScrollResponse, IItemsPaginationResponse } from 'interfaces';
import { FilesInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FilesInterceptor('file'))
  public async createOne(
    @Body() body: CreateRecipeDto,
    @UploadedFiles() files: Express.Multer.File[],
    @CurrentUser('id') userId: string
  ): Promise<Recipe> {
    const recipePhotoes = await this.minioClientService.uploadFiles(files);

    return await this.recipeService.createOne({
      title: body.title,
      description: body.description,
      photos: recipePhotoes,
      recipeIngredient: {
        createMany: {
          data: body.ingredients.map((el) => JSON.parse(el)),
        },
      },
      steps: {
        createMany: {
          data: body.steps.map((el) => ({ content: JSON.parse(el).content })),
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
  }

  @UseGuards(AccessTokenGuard)
  @Put(':id')
  @UseInterceptors(FilesInterceptor('file'))
  public async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateRecipeDto,
    @CurrentUser('id') userId: string
  ): Promise<Recipe> {
    await this.minioClientService.deleteMany(body?.removedPictures);
    // TODO: LATER implement
    const recipe = await this.recipeService.updateOne(
      {
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
      },
      { id }
    );

    return recipe;
  }

  @Get()
  public async findMany(
    @Query()
    {
      title,
      skip = 0,
      take = 10,
      typeIds,
      nationalCuisineIds,
      holidayIds,
    }: GetRecipesQueryParameters
  ): Promise<IItemsPaginationResponse<Recipe>> {
    const whereOptions = {
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
    } as Prisma.RecipeWhereInput;

    const recipes = await this.recipeService.findMany({
      where: whereOptions,
      include: { recipeIngredient: { include: { ingredient: true } } },
      skip,
      take,
    });

    const recipesCount = await this.recipeService.count(whereOptions)

    return {
      items: recipes,
      itemsCount: recipesCount,
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
