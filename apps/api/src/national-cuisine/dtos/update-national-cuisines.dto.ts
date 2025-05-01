import { IsString, ValidateNested } from 'class-validator';
import { UpdateNationalCuisineDto } from './update-national-cuisine.dto';
import { Type } from 'class-transformer';

class UpdateNationalCuisineManyItemDto extends UpdateNationalCuisineDto {
  @IsString()
  id: string;
}

export class UpdateManyNationalCuisinesDto {
  @ValidateNested({ each: true })
  @Type(() => UpdateNationalCuisineManyItemDto)
  updates: UpdateNationalCuisineManyItemDto[];
}
