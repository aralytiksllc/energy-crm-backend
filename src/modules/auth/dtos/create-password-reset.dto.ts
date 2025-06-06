import { IsNotEmpty, IsEmail, IsInt, Min, Max, IsDate } from 'class-validator';

export class CreatePasswordResetDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  @Min(100000)
  @Max(999999)
  code: number;

  @IsNotEmpty()
  @IsDate()
  expiresAt: Date;
}
