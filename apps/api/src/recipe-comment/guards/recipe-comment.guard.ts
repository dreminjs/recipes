import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { RecipeService } from '../../recipe/recipe.service';
import { Request } from 'express';
import { User } from '@prisma/client';

@Injectable()
export class RecipeCommentGuard implements CanActivate {
  constructor(
    private readonly recipeService: RecipeService
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest() as Request;

    const { recipeId } = req.params as { recipeId: string };

    const user = req.user as User;

    const recipe = await this.recipeService.findOne({ id: recipeId });

    if (!recipe) {
      throw new HttpException('Рецепт не найден', HttpStatus.NOT_FOUND);
    }

    if (recipe.userId !== user.id) {
      throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN);
    }

    if (user.role !== 'ADMIN') {
      throw new HttpException('Недостаточно прав', HttpStatus.FORBIDDEN);
    }

    return true
  }
}
