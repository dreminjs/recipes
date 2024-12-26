import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { Holiday } from '@prisma/client';
import { HolidayService } from './holiday.service';
import { UpdateHolidayDto } from './dto/update-holiday.dto';

@Controller('holiday')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) {}

  @Get()
  public async findMany(): Promise<Holiday[]> {
    return await this.holidayService.findMany({});
  }

  @Put()
  public async updateOne(
    @Query('id') id: string,
    @Body() body: UpdateHolidayDto
  ): Promise<Holiday> {
    return await this.holidayService.updateOne({id}, body);
  }

  @Post()
  public async createOne(@Body() body: UpdateHolidayDto): Promise<Holiday> {
    return await this.holidayService.createOne(body);
  }
  
}
