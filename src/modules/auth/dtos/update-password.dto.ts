// External dependencies
import { IsNotEmpty, IsString } from 'class-validator';

// Internal dependencies

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  token: string;
}
