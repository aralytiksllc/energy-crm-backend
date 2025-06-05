import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from '@/common/auth';
import { SignInDto } from './dtos/sign-in.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: SignInDto): Promise<AuthResponse> {
    return this.authService.signIn(dto);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() dto: ChangePasswordDto) {
    return this.authService.resetPassword(dto);
  }
}
