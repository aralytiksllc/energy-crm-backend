import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsInt,
  MinLength,
} from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsInt()
  @MinLength(6)
  code: string;
}
