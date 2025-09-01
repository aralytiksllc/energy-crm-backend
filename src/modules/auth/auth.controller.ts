// External
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';

// Internal
import { Public } from '@/common/auth/auth.decorator';
import { LoginDto } from './dtos/login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AuthService } from './auth.service';
import { AuthResponse } from './auth.interfaces';
import { CurrentUser } from '@/common/auth/current-user.decorator';
import { UserService } from '@/modules/users/user.service';

@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public login(@Body() dto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(dto);
  }

  @Public()
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  public forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Public()
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  public changePassword(@Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(dto);
  }

  @Get('me')
  async getProfile(@CurrentUser() user) {
    const userId = Number(user.id);
    return this.userService.findOne(userId);
  }
}
