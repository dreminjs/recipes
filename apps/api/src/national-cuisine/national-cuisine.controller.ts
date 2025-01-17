import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CreateNationalCuisineDto } from './dtos/create-national-cuisine.dto';
import { NationalCuisine } from '@prisma/client';
import { UpdateNationalCuisineDto } from './dtos/update-national-cuisine.dto';
import { NationalCuisineService } from './national-cuisine.service';
import { GetCharacteristicsQueryParameters } from '../shared';
import { InfiniteScrollResponse } from 'interfaces';

@Controller('national-cuisine')
export class NationalCuisineController {
  constructor(
    private readonly nationalCuisineService: NationalCuisineService
  ) {}

  @Post()
  public async createOne(
    @Body() body: CreateNationalCuisineDto
  ): Promise<NationalCuisine> {
    return this.nationalCuisineService.createOne(body);
  }

  @Get()
  public async findMany(
    @Query() { title, cursor, limit }: GetCharacteristicsQueryParameters
  ): Promise<InfiniteScrollResponse<NationalCuisine>> {
    const nationalCuisines = await this.nationalCuisineService.findMany({
      where: {
        ...(title && { title }),
      },
      skip: cursor,
      take: limit,
    });

    const nextCursor = nationalCuisines.length > 0 ? limit + cursor : null;

    return { data: nationalCuisines, nextCursor };
  }

  @Put(':id')
  public async updateOne(
    @Body() body: UpdateNationalCuisineDto,
    @Param('id') id: string
  ): Promise<NationalCuisine> {
    return await this.nationalCuisineService.updateOne({ id }, { ...body });
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<NationalCuisine> {
    return await this.nationalCuisineService.findOne({ where: { id } });
  }

  @Delete(':id')
  public async deleteOne(@Param('id') id: string): Promise<void> {
    await this.nationalCuisineService.deleteOne({ id }); 
  }
}
