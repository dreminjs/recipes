import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { PrismaModule } from '../prisma';
import { HolidayModule } from '../holiday/holiday.module';
import { NationalCuisineModule } from '../national-cuisine/national-cuisine.module';
import { TypeModule } from '../type/type.module';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
  imports: [PrismaModule, MinioClientModule,HolidayModule,NationalCuisineModule, TypeModule],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule {

}
