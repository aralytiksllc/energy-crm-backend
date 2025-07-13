// External dependencies
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

// Internal dependencies
import { LoginDto } from './dtos/login.dto';
import { LoginCommand } from './commands/login.command';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ForgotPasswordCommand } from './commands/forgot-password.command';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { UpdatePasswordCommand } from './commands/update-password.command';
import { AuthResponse } from './auth.interfaces';

@Injectable()
export class AuthService {
  constructor(private readonly commandBus: CommandBus) {}

  async login(dto: LoginDto): Promise<AuthResponse> {
    const command = new LoginCommand(dto);
    return this.commandBus.execute(command);
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    const command = new ForgotPasswordCommand(dto);
    return this.commandBus.execute(command);
  }

  async updatePassword(dto: UpdatePasswordDto): Promise<void> {
    const command = new UpdatePasswordCommand(dto);
    return this.commandBus.execute(command);
  }
}
