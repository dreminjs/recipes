import { MaxLength, MinLength } from 'class-validator';

export class CreateRecipeDto {
  @MinLength(2, { message: 'Заголовок должен быть больше 2 символов' })
  @MaxLength(100, { message: 'Заголовок должен быть меньше 100 символов' })
  title: string;

  @MinLength(2, { message: 'Описание должно быть больше 2 символов' })
  @MaxLength(1000, { message: 'Описание должно быть меньше 1000 символов' })
  description: string;

  ingredients: string[];

  steps: string[];
  
  nationalCuisineId: string;

  typeId: string;

  holidayId: string;
}
