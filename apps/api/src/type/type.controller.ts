import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Type } from 'prisma/prisma-client';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateHolidayDto } from '../holiday/dto/update-holiday.dto';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  public async findMany(): Promise<Type[]> {
    return await this.typeService.findMany({});
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
