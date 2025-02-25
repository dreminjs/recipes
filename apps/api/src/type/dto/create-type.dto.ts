import { IsString, MinLength, MaxLength } from "class-validator";

export class CreateTypeDto {
  @IsString({ message: 'Название должно быть строкой' })
  @MinLength(2, { message: 'Название должно быть больше 2 символов' })
  @MaxLength(100, { message: 'Название должно быть меньше 100 символов' })
  title: string;
}
