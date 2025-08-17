// External
import { IsNotEmpty, IsEmail } from 'class-validator';

// Internal

export class ForgotPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
