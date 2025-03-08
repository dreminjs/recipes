import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RecipeCommentService } from './recipe-comment.service';
import { CreateRecipeCommentDto } from './dto/create-recipe-comment.dto';
import { CurrentUser } from '../user';
import { RecipeComment, User } from '@prisma/client';
import { IInfiniteScrollResponse } from 'interfaces';
import { UpdateRecipeCommentDto } from './dto/update-recipe-comment.dto';
import { AccessTokenGuard } from '../token';
import { RecipeCommentGuard } from './guards/recipe-comment.guard';

@Controller('recipe-comments')
export class RecipeCommentController {
  constructor(private readonly recipeCommentService: RecipeCommentService) {}

  @UseGuards(AccessTokenGuard)
  @Post(':id')
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

  @Get(':recipeId')
  public async findMany(
    @Param('recipeId') recipeId: string,
    @Query('cursor', ParseIntPipe) cursor: number,
    @Query('take', ParseIntPipe) take: number
  ): Promise<IInfiniteScrollResponse<RecipeComment>> {
    const items = await this.recipeCommentService.findMany({
      where: { recipe: { id: recipeId } },
    });

    const nextCursor = items.length > 0 ? cursor + take : null;

    return {
      items,
      nextCursor,
    };
  }

  @UseGuards(RecipeCommentGuard)
  @UseGuards(AccessTokenGuard)
  @Put('/:id')
  public async updateOne(
    @Body() body: UpdateRecipeCommentDto,
    @Query('id') id: string
  ): Promise<RecipeComment> {
    return await this.recipeCommentService.updateOne({ id: id }, body);
  }
}
