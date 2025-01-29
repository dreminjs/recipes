import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Holiday } from '@prisma/client';
import { HolidayService } from './holiday.service';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { GetCharacteristicsQueryParameters } from '../shared';
import { IItemsPaginationResponse } from 'interfaces';

@Controller('holiday')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) {}

  @Get()
  public async findMany(
    @Query() { title, page, limit }: GetCharacteristicsQueryParameters
  ): Promise<IItemsPaginationResponse<Holiday>> {
    const [items, count] = await Promise.all([
      await this.holidayService.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          ...(title && { title: { contains: title } }),
        },
      }),
      await this.holidayService.count(),
    ]);
    return {
      items,
      currentPage: page,
      countItems: count,
    };
  }

  @Put(':id')
  public async updateOne(
    @Param('id') id: string,
    @Body() body: UpdateHolidayDto
  ): Promise<Holiday> {
    return await this.holidayService.updateOne({ id }, body);
  }

  @Post()
  public async createOne(@Body() body: UpdateHolidayDto): Promise<Holiday> {
    return await this.holidayService.createOne(body);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<Holiday> {
    return await this.holidayService.findOne({ where: { id } });
  }

  @Delete()
  public async deleteMany(@Query('id') id: string[] | string): Promise<void> {
    return await this.holidayService.deleteMany({
      where: { id: { in: id instanceof Array ? [...id] : [id] } },
    });
  }
}
