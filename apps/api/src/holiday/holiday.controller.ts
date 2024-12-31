import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Holiday } from '@prisma/client';
import { HolidayService } from './holiday.service';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { GetCharacteristicsQueryParameters } from '../shared';
import { InfiniteScrollResponse } from 'interfaces';

@Controller('holiday')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) {}

  @Get()
  public async findMany(
    @Query() { title, cursor, limit }: GetCharacteristicsQueryParameters
  ): Promise<InfiniteScrollResponse<Holiday>> {
    const holidays = await this.holidayService.findMany({
      where: {
        ...(title && { title }),
      },
      skip: cursor,
      take: limit,
    });

    const nextCursor = holidays.length > 0 ? limit + cursor : null;

    return { data: holidays, nextCursor, };
  }

  @Put()
  public async updateOne(
    @Query('id') id: string,
    @Body() body: UpdateHolidayDto
  ): Promise<Holiday> {
    return await this.holidayService.updateOne({ id }, body);
  }

  @Post()
  public async createOne(@Body() body: UpdateHolidayDto): Promise<Holiday> {
    return await this.holidayService.createOne(body);
  }

  @Get(':id')
  public async findOne(@Query('id') id: string): Promise<Holiday> {
    return await this.holidayService.findOne({ where: { id } });
  }
}
