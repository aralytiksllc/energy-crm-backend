// External dependencies
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

// Internal dependencies
import { Public } from '@/common/auth';
import { LoginDto } from './dtos/login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth.interfaces';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(dto);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('update-password')
  @HttpCode(HttpStatus.OK)
  updatePassword(@Body() dto: UpdatePasswordDto) {
    return this.authService.updatePassword(dto);
  }
}
