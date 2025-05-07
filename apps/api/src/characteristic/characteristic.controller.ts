import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { TypeService } from '../type/type.service';
import { NationalCuisineService } from '../national-cuisine/national-cuisine.service';
import { HolidayService } from '../holiday/holiday.service';
import { Characteristics } from 'interfaces';
import { } from './dto/get-characteristics-query-parameters';

@Controller('characteristics')
export class CharacteristicController {
  constructor(
    private readonly holidayService: HolidayService,
    private readonly nationalCuisineService: NationalCuisineService,
    private readonly typeService: TypeService
  ) {}

  @Get('random')
  public async findRandom(@Query('type') type: Characteristics) {
    if (type === 'types') {
      return await this.typeService.findOne();
    } else if (type === 'holidays') {
      return await this.holidayService.findOne();
    } else if (type === 'national-cuisines') {
      return await this.nationalCuisineService.findOne();
    }else {
      throw new NotFoundException("404")
    }
  }
}
