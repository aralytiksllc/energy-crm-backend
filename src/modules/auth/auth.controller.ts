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
  async Login(@Body() dto: LoginDto): Promise<AuthResponse> {
    return this.authService.Login(dto);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('update-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Body() dto: UpdatePasswordDto) {
    return this.authService.changePassword(dto);
  }
}
