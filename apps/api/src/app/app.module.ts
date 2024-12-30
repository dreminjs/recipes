import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth';
import { PasswordModule } from '../password/password.module';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user';
import { TypeModule } from '../type/type.module';
import { NationalCuisineModule } from '../national-cuisine/national-cuisine.module';
import { HolidayModule } from '../holiday/holiday.module';
import { CharacteristicModule } from '../characteristic/characteristic.module';
import { RecipeModule } from '../recipe/recipe.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    TokenModule,
    UserModule,
    AuthModule,
    PasswordModule,
    TypeModule,
    NationalCuisineModule,
    HolidayModule,
    CharacteristicModule,
    RecipeModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
