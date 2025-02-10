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
import { Roles, Type } from 'prisma/prisma-client';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { GetCharacteristicsQueryParameters } from '../shared';
import { IItemsPaginationResponse } from 'interfaces';
import { AllowedRoles } from '../user/decorators/roles.decorator';
import { RolesGuard } from '../user/guards/roles.guard';
import { AccessTokenGuard } from '../token';
import { UpdateTypeDto } from './dto/update-type.dto';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  public async findMany(
    @Query() { title, page, limit }: GetCharacteristicsQueryParameters
  ): Promise<IItemsPaginationResponse<Type>> {
    const itemsQuery = this.typeService.findMany({
      where: {
        ...(title && { title: { contains: title } }),
      },
      skip: page === 0 ? 0 : (page - 1) * limit,
      take: limit,
    });

    const countQuery = this.typeService.count({
      where: { ...(title && { title: { contains: title } }) },
    });

    const [items, count] = await Promise.all([itemsQuery, countQuery]);

    return {
      items,
      currentPage: page,
      countItems: count,
    };
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post()
  public async createOne(@Body() body: CreateTypeDto): Promise<Type> {
    return await this.typeService.createOne(body);
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Delete()
  public async deleteMany(@Query('id') id: string[] | string): Promise<void> {
    await this.typeService.deleteMany({
      where: { id: { in: id instanceof Array ? [...id] : [id] } },
    });
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Put(':id')
  public async updateOne(
    @Body() body: UpdateTypeDto,
    @Param('id') id: string
  ): Promise<Type> {
    return await this.typeService.updateOne({ id }, { ...body });
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Type> {
    return await this.typeService.findOne({ where: { id } });
  }

  // @AllowedRoles(Roles.ADMIN)
  // @UseGuards(AccessTokenGuard, RolesGuard)
  // @Delete(':id')
  // public async deleteOne(@Param('id') id: string): Promise<void> {
  //   await this.typeService.deleteOne({ id });
  // }
}
