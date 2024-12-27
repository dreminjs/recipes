import { Body, Controller, Param, Post } from '@nestjs/common';
import { RecipeCommentService } from './recipe-comment.service';
import { CreateRecipeCommentDto } from './dto/create-recipe-comment.dto';
import { CurrentUser } from '../user';
import { RecipeComment, User } from '@prisma/client';

@Controller('recipe-comment')
export class RecipeCommentController {
  constructor(private readonly recipeCommentService: RecipeCommentService) {}

  @Post(':/id')
  public async createOne(
    @Param('id') recipeId: string,
    @Body() body: CreateRecipeCommentDto,
    @CurrentUser() user: User
  ): Promise<RecipeComment> {
    return await this.recipeCommentService.createOne({
      user: { connect: { id: user.id } },
      content: body.content,
      recipe: { connect: { id: recipeId } },
    });
  }
}
