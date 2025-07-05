import { MinLength, MaxLength, IsEmail, IsString } from 'class-validator';

export class SigninTwoFaDto {
  @MinLength(3, { message: 'Secret must be at least 5 characters long' })
  @MaxLength(100, { message: 'Secret must be at most 5 characters long' })
  @IsString()
  secret: string;

  @IsEmail()
  email: string;
}
