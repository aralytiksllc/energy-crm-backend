// External dependencies
import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

// Internal dependencies

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
