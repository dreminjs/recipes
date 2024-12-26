import { Module } from '@nestjs/common';
import { HolidayController } from './holiday.controller';
import { HolidayService } from './holiday.service';
import { PrismaModule } from '../prisma';

@Module({
  imports: [PrismaModule],
  controllers: [HolidayController],
  providers: [HolidayService]
})
export class HolidayModule {}
