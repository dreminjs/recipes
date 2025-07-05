import { TypeService } from '../type/type.service';
import { NationalCuisineService } from '../national-cuisine/national-cuisine.service';
import { HolidayService } from '../holiday/holiday.service';
import { Characteristics } from 'interfaces';
import { Holiday, NationalCuisine, Type } from '@prisma/client';
import { Controller, Get, Query, NotFoundException } from '@nestjs/common';

@Controller('characteristics')
export class CharacteristicController {
  constructor(
    private readonly holidayService: HolidayService,
    private readonly nationalCuisineService: NationalCuisineService,
    private readonly typeService: TypeService
  ) {}

  @Get('random')
  public async findRandom(
    @Query('type') type: Characteristics
  ): Promise<Type | NationalCuisine | Holiday> {
    switch (type) {
      case 'types':
        return await this.typeService.findOne();
      case 'national-cuisines':
        return await this.nationalCuisineService.findOne();
      case 'holidays':
        return await this.holidayService.findOne();
      default:
        throw new NotFoundException('404');
    }
  }
}
