import { MinLength, MaxLength, IsString, IsEmail } from 'class-validator';

export class SignupDto {
  @MinLength(3, { message: 'Nickname must be at least 3 characters long' })
  @MaxLength(100, { message: 'Nickname must be at most 100 characters long' })
  @IsString()
  nickname: string;
  @IsEmail()
  @MinLength(3, { message: 'Email must be at least 3 characters long' })
  @MaxLength(100, { message: 'Email must be at most 100 characters long' })
  @IsString()
  email: string;
  @MinLength(3, { message: 'Password must be at least 3 characters long' })
  @MaxLength(100, { message: 'Password must be at most 100 characters long' })
  @IsString()
  password: string;
}
