import { IsNotEmpty, IsEmail, IsString, IsDate } from 'class-validator';

export class CreatePasswordResetDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsDate()
  expiresAt: Date;
}
