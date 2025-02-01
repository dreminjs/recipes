import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientService } from './ingredient.service';
import { Ingredient, IngredientRequest, Roles } from '@prisma/client';
import { GetIngredientsQueryParameters } from './dto/get-ingredients-query-parameters';
import { IItemsPaginationResponse } from 'interfaces';
import { AllowedRoles } from '../user/decorators/roles.decorator';
import { AccessTokenGuard } from '../token';
import { RolesGuard } from '../user/guards/roles.guard';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  public async createOne(
    @Body() body: CreateIngredientDto
  ): Promise<Ingredient> {
    return await this.ingredientService.createOne(body);
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(":id")
  public async updateOne(
    @Body() body: UpdateIngredientDto,
    @Param("id") id: string
  ): Promise<Ingredient> {
    return await this.ingredientService.updateOne({...body},{id});
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
