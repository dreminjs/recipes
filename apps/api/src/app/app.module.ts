import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma';
import { AuthModule } from '../auth';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user';
import { TypeModule } from '../type/type.module';
import { NationalCuisineModule } from '../national-cuisine/national-cuisine.module';
import { HolidayModule } from '../holiday/holiday.module';
import { CharacteristicModule } from '../characteristic/characteristic.module';
import { RecipeModule } from '../recipe/recipe.module';
import { IngredientModule } from '../ingredient/ingredient.module';
import { MinioClientModule } from '../minio-client/minio-client.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    TokenModule,
    UserModule,
    AuthModule,
    TypeModule,
    NationalCuisineModule,
    HolidayModule,
    CharacteristicModule,
    IngredientModule,
    RecipeModule,
    MinioClientModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
