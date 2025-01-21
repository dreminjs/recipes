import { Controller, Get, Logger } from '@nestjs/common';
import { TypeService } from '../type/type.service';
import { NationalCuisineService } from '../national-cuisine/national-cuisine.service';
import { HolidayService } from '../holiday/holiday.service';
import { ICharacteristic } from 'interfaces';

@Controller('characteristic')
export class CharacteristicController {
  constructor(
    private readonly holidayService: HolidayService,
    private readonly nationalCuisineService: NationalCuisineService,
    private readonly typeService: TypeService
  ) {}
  @Get('random')
  async findRandom(): Promise<ICharacteristic> {
    const characteristicIdx = Math.floor(Math.random() * 3);
    if (characteristicIdx === 0) {
      const res = await this.holidayService.findOne({
        select: { id: true, title: true },
      });
      return { isVisible: undefined, ...res, type:"holiday" };
    }
    if (characteristicIdx === 1) {
      const res = await this.nationalCuisineService.findOne({
        select: { id: true, title: true },
      });
      return { isVisible: undefined, ...res, type:"national-cuisine" };
    }
    if (characteristicIdx === 2) {
      const res = await this.typeService.findOne({
        select: { id: true, title: true },
      });
      return { isVisible: undefined, ...res, type:"type" };
    }

  }
}
