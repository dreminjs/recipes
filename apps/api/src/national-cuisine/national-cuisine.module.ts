import { Module } from '@nestjs/common';
import { NationalCuisineController } from './national-cuisine.controller';

@Module({
  controllers: [NationalCuisineController]
})
export class NationalCuisineModule {}
