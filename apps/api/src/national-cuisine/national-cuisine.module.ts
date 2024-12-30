import { Module } from '@nestjs/common';
import { NationalCuisineController } from './national-cuisine.controller';
import { NationalCuisineService } from './national-cuisine.service';
import { PrismaModule } from '../prisma';

@Module({
  imports: [PrismaModule],
  controllers: [NationalCuisineController],
  providers: [NationalCuisineService],
  exports: [NationalCuisineService],
})
export class NationalCuisineModule {}
