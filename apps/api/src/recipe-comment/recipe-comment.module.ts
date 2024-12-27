import { Module } from '@nestjs/common';
import { RecipeCommentController } from './recipe-comment.controller';
import { RecipeCommentService } from './recipe-comment.service';
import { PrismaModule } from '../prisma';
import { UserModule } from '../user';
import { RecipeModule } from '../recipe/recipe.module';

@Module({
  imports: [PrismaModule, UserModule, RecipeModule],
  controllers: [RecipeCommentController],
  providers: [RecipeCommentService],
})
export class RecipeCommentModule {}
