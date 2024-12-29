import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

import { PrismaModule } from '../prisma';
import { MulterModule } from '@nestjs/platform-express';
import { UploadPhotoMiddleware } from './middlewares/recipe-photo-upload.middleware';
import { HolidayModule } from '../holiday/holiday.module';
import { NationalCuisineModule } from '../national-cuisine/national-cuisine.module';
import { TypeModule } from '../type/type.module';

@Module({
  imports: [PrismaModule, MulterModule.register({ dest: './assets' }), HolidayModule,NationalCuisineModule, TypeModule],
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UploadPhotoMiddleware)
      .forRoutes({ path: 'images', method: RequestMethod.POST })
      .apply(UploadPhotoMiddleware).forRoutes({ path: 'images', method: RequestMethod.PUT })
      .apply(UploadPhotoMiddleware).forRoutes({ path: 'images', method: RequestMethod.PATCH });
  }
}
