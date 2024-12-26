import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe, User } from '@prisma/client';
import { RecipeService } from './recipe.service';
import { CurrentUser } from '../user';
import { RecipePhoto } from './recipe-photo.decorator';
import { AccessTokenGuard } from '../token';


@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  public async createOne(
    @Body() body: CreateRecipeDto,
    @CurrentUser() user: User,
    @RecipePhoto() photo: string
  ): Promise<Recipe> {
    
    const recipe = await this.recipeService.createOne({
      title: body.title,
      description: body.description,
      photo,
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
