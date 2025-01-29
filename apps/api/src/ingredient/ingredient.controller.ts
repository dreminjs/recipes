import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientService } from './ingredient.service';
import { Ingredient, IngredientRequest } from '@prisma/client';
import { GetIngredientsQueryParameters } from './dto/get-ingredients-query-parameters';
import { IInfiniteScrollResponse } from 'interfaces';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  public async createOne(
    @Body() body: CreateIngredientDto
  ): Promise<Ingredient> {
    return await this.ingredientService.createOne(body);
  }

  @Get()
  public async findMany(
    @Query() { title, cursor, limit }: GetIngredientsQueryParameters
  ): Promise<IInfiniteScrollResponse<Ingredient>> {
    const ingredients = await this.ingredientService.findMany({
      where: {
        ...(title ? { title } : {}),
      },
      skip: cursor,
      take: limit,
    });

    const nextCursor = ingredients.length > 0 ? limit : null;

    return {
      nextCursor,
      data: ingredients,
    };
  }

  @Post('request')
  public async createRequest(
    @Body() body: CreateIngredientDto
  ): Promise<IngredientRequest> {
    return await this.ingredientService.createRequest({ ...body });
  }
}
