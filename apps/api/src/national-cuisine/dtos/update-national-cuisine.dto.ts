import { PartialType } from '@nestjs/mapped-types';
import { CreateNationalCuisineDto } from './create-national-cuisine.dto';

export class UpdateNationalCuisineDto extends PartialType(CreateNationalCuisineDto) {}
