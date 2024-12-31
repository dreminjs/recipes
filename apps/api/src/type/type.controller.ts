import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Type } from 'prisma/prisma-client';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateHolidayDto } from '../holiday/dto/update-holiday.dto';
import { GetCharacteristicsQueryParameters } from '../shared';
import { InfiniteScrollResponse } from 'interfaces';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  public async findMany(
    @Query() { title, cursor, limit }: GetCharacteristicsQueryParameters
  ): Promise<InfiniteScrollResponse<Type>> {
    const types = await this.typeService.findMany({
      where: {
        ...(title && { title }),
      },
      skip: cursor,
      take: limit,
    });

    const nextCursor = types.length > 0 ? limit + cursor : null;

    return { data: types, nextCursor };
  }
  @Post()
  public async createOne(@Body() body: CreateTypeDto): Promise<Type> {
    return await this.typeService.createOne(body);
  }

  @Put(':id')
  public async updateOne(
    @Body() body: UpdateHolidayDto,
    @Query('id') id: string
  ): Promise<Type> {
    return await this.typeService.updateOne({ id }, { ...body });
  }

  @Get(':id')
  public async findOne(@Query('id') id: string): Promise<Type> {
    return await this.typeService.findOne({ where: { id } });
  }
}
