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
import { UpdateHolidayDto } from '../holiday/dto/update-holiday.dto';
import { GetCharacteristicsQueryParameters } from '../shared';
import { InfiniteScrollResponse } from 'interfaces';
import { AllowedRoles } from '../user/decorators/roles.decorator';
import { RolesGuard } from '../user/guards/roles.guard';
import { AccessTokenGuard } from '../token';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  public async findMany(
    @Query() { title, cursor, limit }: GetCharacteristicsQueryParameters
  ): Promise<InfiniteScrollResponse<Type>> {
    const types = await this.typeService.findMany({
      where: {
        ...(title && { title: { contains: title } }),
      },
      skip: cursor,
      take: limit,
    });

    const nextCursor = types.length > 0 ? limit + cursor : null;

    return { data: types, nextCursor };
  }
  @UseGuards(AccessTokenGuard,RolesGuard)
  @AllowedRoles(Roles.ADMIN)
  @Post()
  public async createOne(@Body() body: CreateTypeDto): Promise<Type> {
    return await this.typeService.createOne(body);
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(AccessTokenGuard,RolesGuard)
  @Put(':id')
  public async updateOne(
    @Body() body: UpdateHolidayDto,
    @Param('id') id: string
  ): Promise<Type> {
    return await this.typeService.updateOne({ id }, { ...body });
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(RolesGuard,AccessTokenGuard)
  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Type> {
    return await this.typeService.findOne({ where: { id } });
  }

  @AllowedRoles(Roles.ADMIN)
  @UseGuards(RolesGuard,AccessTokenGuard)
  @Delete(':id')
  public async deleteOne(@Param('id') id: string): Promise<void> {
    await this.typeService.deleteOne({ id });
  }
}
