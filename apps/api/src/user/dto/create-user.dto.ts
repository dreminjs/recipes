import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3, { message: 'Nickname must be at least 3 characters long' })
  @MaxLength(100, { message: 'Nickname must be at most 100 characters long' })
  @IsString()
  nickname: string;

  @MinLength(3, { message: 'Nickname must be at least 3 characters long' })
  @IsString()
  @MaxLength(330, { message: 'Email must be at most 330 characters long' })
  email: string;


  @MinLength(3, { message: 'Password must be at least 3 characters long' })
  @MaxLength(100, { message: 'Password must be at most 100 characters long' })
  @IsString()
  password: string
}
