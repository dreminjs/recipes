import { MaxLength, MinLength } from 'class-validator';

export class CreateRecipeCommentDto {
  @MinLength(1, { message: 'Содержание должно быть больше 1 символов' })
  @MaxLength(1000, { message: 'Содержание должно быть меньше 1000 символов' })
  content: string;
}
