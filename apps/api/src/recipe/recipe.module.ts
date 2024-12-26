import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

import { PrismaModule } from '../prisma';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [PrismaModule, MulterModule.register({ dest: './assets' })],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
