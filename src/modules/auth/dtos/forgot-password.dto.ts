// External dependencies
import { IsNotEmpty, IsEmail } from 'class-validator';

// Internal dependencies

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
