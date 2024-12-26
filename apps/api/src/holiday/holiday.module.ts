import { Module } from '@nestjs/common';
import { HolidayController } from './holiday.controller';
import { HolidayService } from './holiday.service';

@Module({
  controllers: [HolidayController],
  providers: [HolidayService]
})
export class HolidayModule {}
