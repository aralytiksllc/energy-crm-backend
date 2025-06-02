import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SignInDto } from './dtos/sign-in.dto';
import { SignInCommand } from './commands/sign-in.command';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ForgotPasswordCommand } from './commands/forgot-password.command';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { ResetPasswordCommand } from './commands/reset-password.command';
import { AuthResponse } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async signIn(dto: SignInDto): Promise<AuthResponse> {
    return this.commandBus.execute(new SignInCommand(dto));
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    return this.commandBus.execute(new ForgotPasswordCommand(dto));
  }

  async resetPassword(dto: ResetPasswordDto): Promise<void> {
    return this.commandBus.execute(new ResetPasswordCommand(dto));
  }
}
