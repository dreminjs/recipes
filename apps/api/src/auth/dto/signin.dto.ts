import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SigninDto {
  @MinLength(3, { message: 'Password must be at least 3 characters long' })
  @MaxLength(100, { message: 'Password must be at most 100 characters long' })
  @IsEmail()
  @IsString()
  email: string;
  @MinLength(3, { message: 'Password must be at least 3 characters long' })
  @MaxLength(100, { message: 'Password must be at most 100 characters long' })
  @IsString()
  password: string;
}
