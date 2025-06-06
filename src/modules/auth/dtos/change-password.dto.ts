import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  IsInt,
} from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsInt()
  code: number;
}
