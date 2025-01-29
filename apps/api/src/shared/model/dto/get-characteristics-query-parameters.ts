import { Transform } from 'class-transformer';

export class GetCharacteristicsQueryParameters {
  title?: string;

  @Transform(({ value }) => parseInt(value, 10))
  limit: number;

  @Transform(({ value }) => parseInt(value, 10))
  page: number;
}

