// External dependencies
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

// Internal dependencies

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
