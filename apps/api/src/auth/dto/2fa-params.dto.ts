import { IsUUID } from 'class-validator';

export class TwoFaParamsDto {
  @IsUUID()
  userId: string;
}
