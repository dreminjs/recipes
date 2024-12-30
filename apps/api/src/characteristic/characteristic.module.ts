import { Module } from '@nestjs/common';
import { CharacteristicController } from './characteristic.controller';
import { HolidayModule } from '../holiday/holiday.module';
import { TypeModule } from '../type/type.module';
import { NationalCuisineModule } from '../national-cuisine/national-cuisine.module';

@Module({
  imports: [HolidayModule, TypeModule, NationalCuisineModule],
  controllers: [CharacteristicController],
})
export class CharacteristicModule {}
