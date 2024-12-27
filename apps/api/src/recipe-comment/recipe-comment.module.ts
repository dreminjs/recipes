import { Module } from '@nestjs/common';
import { RecipeCommentController } from './recipe-comment.controller';
import { RecipeCommentService } from './recipe-comment.service';
import { PrismaModule } from '../prisma';

@Module({
  imports: [PrismaModule],
  controllers: [RecipeCommentController],
  providers: [RecipeCommentService]
})
export class RecipeCommentModule {}
