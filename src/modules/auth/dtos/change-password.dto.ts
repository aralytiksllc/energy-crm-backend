// External
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

// Internal

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => Number)
  userId: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
