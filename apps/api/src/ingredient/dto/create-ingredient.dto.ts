import { Measure } from '@prisma/client';
import { MaxLength, MinLength } from 'class-validator';

export class CreateIngredientDto {
  @MinLength(2, { message: 'Заголовок должен быть больше 2 символов' })
  @MaxLength(100, { message: 'Заголовок должен быть меньше 100 символов' })
  title: string;

  measure: Measure;
}
