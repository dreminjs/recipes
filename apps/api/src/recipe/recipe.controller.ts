import { Body, Controller, Post } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe, User } from '@prisma/client';
import { RecipeService } from './recipe.service';
import { CurrentUser } from '../user';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  public async createOne(
    @Body() body: CreateRecipeDto,
    @CurrentUser() user: User
  ): Promise<Recipe> {
    

    const recipe = await this.recipeService.createOne({
      title: body.title,
      description: body.description,
      ingredients: {
        createMany: {
          data: body.ingredients,
        },
      },
      steps:{
        createMany: {
          data: body.steps,
        },
      },
      user: {
        connect: { id: user.id },
      },
    });

    return recipe;
  }
}
