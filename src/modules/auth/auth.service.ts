// External
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

// Internal
import { LoginDto } from './dtos/login.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { LoginCommand } from './commands/login.command';
import { ForgotPasswordCommand } from './commands/forgot-password.command';
import { ChangePasswordCommand } from './commands/change-password.command';
import { AuthResponse } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly commandBus: CommandBus) {}

  public login(dto: LoginDto): Promise<AuthResponse> {
    const command = new LoginCommand(dto);
    return this.commandBus.execute(command);
  }

  public forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const command = new ForgotPasswordCommand(dto);
    return this.commandBus.execute(command);
  }

  public changePassword(dto: ChangePasswordDto): Promise<void> {
    const command = new ChangePasswordCommand(dto);
    return this.commandBus.execute(command);
  }
}
