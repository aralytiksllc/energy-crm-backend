import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignInDto } from './dtos/sign-in.dto';
import { SignInCommand } from './commands/sign-in.command';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ForgotPasswordCommand } from './commands/forgot-password.command';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { ChangePasswordCommand } from './commands/change-password.command';
import { AuthResponse } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly commandBus: CommandBus) {}

  async signIn(dto: SignInDto): Promise<AuthResponse> {
    return this.commandBus.execute(new SignInCommand(dto));
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    return this.commandBus.execute(new ForgotPasswordCommand(dto));
  }

  async changePassword(dto: ChangePasswordDto): Promise<void> {
    return this.commandBus.execute(new ChangePasswordCommand(dto));
  }
}
