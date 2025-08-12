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
} from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientService } from './ingredient.service';
import { Ingredient, IngredientRequest, Roles } from '@prisma/client';
import { GetIngredientsQueryParameters } from './dto/get-ingredients-query-parameters';
import { IItemsPaginationResponse } from 'interfaces';
import { AllowedRoles } from '../user/decorators/roles.decorator';
import { AccessTokenGuard } from '../token';
import { RolesGuard } from '../user/guards/roles.guard';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredients')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Post()
  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  public async createOne(
    @Body() body: CreateIngredientDto
  ): Promise<Ingredient> {
    return await this.ingredientService.createOne(body);
  }

  @Put(':id')
  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  public async updateOne(
    @Body() body: UpdateIngredientDto,
    @Param('id') id: string
  ): Promise<Ingredient> {
    return await this.ingredientService.updateOne({ ...body }, { id });
  }

  @Get()
  public async findMany(
    @Query() { title, page, limit }: GetIngredientsQueryParameters
  ): Promise<IItemsPaginationResponse<Ingredient>> {
    const itemsQuery = this.ingredientService.findMany({
      where: {
        ...(title && { title: { contains: title } }),
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const countQuery = this.ingredientService.count({
      where: { ...(title ? { title: { contains: title } } : {}) },
    });

    const [items, itemsCount] = await Promise.all([itemsQuery, countQuery]);
    return {
      items,
      itemsCount,
    };
  }

  @UseGuards(AccessTokenGuard)
  @Post('request')
  public async createRequest(
    @Body() body: CreateIngredientDto
  ): Promise<IngredientRequest> {
    return await this.ingredientService.createRequest({ ...body });
  }

  @UseGuards(AccessTokenGuard)
  @Delete('request/:id')
  public async deleteRequest(@Param('id') id: string): Promise<void> {
    await this.ingredientService.deleteRequest({ where: { id } });
  }

  @UseGuards(AccessTokenGuard)
  @Post('request/aprove/:id')
  public async aproveRequest(@Param('id') id: string): Promise<Ingredient> {
    const { measure, title } = await this.ingredientService.findRequest({
      where: { id },
    });
    const ingredientQuery = this.ingredientService.createOne({
      measure,
      title,
    });
    const deleteIngredientQuery = this.ingredientService.deleteRequest({ where: { id } });
    const [ingredient] = await Promise.all([ingredientQuery,deleteIngredientQuery])
    return ingredient
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete()
  public async deleteMany(@Query('id') id: string[] | string): Promise<void> {
    return await this.ingredientService.deleteMany({
      where: { id: { in: id instanceof Array ? [...id] : [id] } },
    });
  }
}
