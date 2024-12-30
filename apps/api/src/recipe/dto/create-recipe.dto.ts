import { IsArray, IsString, MaxLength, MinLength } from 'class-validator';
import { IRecipeIngredient, IStep } from 'interfaces';

export class CreateRecipeDto {
  @MinLength(2, { message: 'Заголовок должен быть больше 2 символов' })
  @MaxLength(100, { message: 'Заголовок должен быть меньше 100 символов' })
  @IsString({ message: 'Заголовок должен быть строкой' })
  title: string;

  @MinLength(2, { message: 'Описание должно быть больше 2 символов' })
  @MaxLength(1000, { message: 'Описание должно быть меньше 1000 символов' })
  @IsString({ message: 'Описание должно быть строкой' })
  description: string;

  @IsArray({ message: 'Ингредиенты должны быть массивом' })
  recipeIngredients: IRecipeIngredient[];
  @IsArray({ message: 'Шаги должны быть массивом' })
  steps: IStep[];
  
  @IsString()
  nationalCuisineId: string;

  @IsString()
  typeId: string;

  @IsString()
  holidayId: string;
}
