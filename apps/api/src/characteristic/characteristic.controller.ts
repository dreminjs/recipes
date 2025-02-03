import { Controller, Get, Logger, NotFoundException, Query } from '@nestjs/common';
import { TypeService } from '../type/type.service';
import { NationalCuisineService } from '../national-cuisine/national-cuisine.service';
import { HolidayService } from '../holiday/holiday.service';
import { Characteristics, ICharacteristic } from 'interfaces';
import { GetCharacteristicsQueryParameters } from './dto/get-characteristics-query-parameters';

@Controller('characteristic')
export class CharacteristicController {
  constructor(
    private readonly holidayService: HolidayService,
    private readonly nationalCuisineService: NationalCuisineService,
    private readonly typeService: TypeService
  ) {}

  @Get('random')
  public async findRandom(@Query('type') type: Characteristics) {
    if (type === 'type') {
      return await this.typeService.findOne();
    } else if (type === 'holiday') {
      return await this.holidayService.findOne();
    } else if (type === 'national-cuisine') {
      return await this.nationalCuisineService.findOne();
    }else {
      throw new NotFoundException("404")
    }
  }
}
