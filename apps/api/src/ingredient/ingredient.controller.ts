import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientService } from './ingredient.service';
import { Ingredient, IngredientRequest } from '@prisma/client';
import { GetIngredientsQueryParameters } from './dto/get-ingredients-query-parameters';
import { IItemsPaginationResponse } from 'interfaces';

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
    @Query() { title, page, limit }: GetIngredientsQueryParameters
  ): Promise<IItemsPaginationResponse<Ingredient>> {
    const [items, count] = await Promise.all([
      await this.ingredientService.findMany({
        where: {
          ...(title ? { title } : {}),
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      await this.ingredientService.count({
        where: { ...(title ? { title: { contains: title } } : {}) },
      }),
    ]);
    return {
      items,
      countItems: count,
      currentPage: page,
    };
  }

  @Post('request')
  public async createRequest(
    @Body() body: CreateIngredientDto
  ): Promise<IngredientRequest> {
    return await this.ingredientService.createRequest({ ...body });
  }
}
