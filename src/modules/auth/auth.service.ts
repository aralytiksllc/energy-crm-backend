import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
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

  async Login(dto: LoginDto): Promise<AuthResponse> {
    return this.commandBus.execute(new LoginCommand(dto));
  }

  async forgotPassword(dto: ForgotPasswordDto): Promise<void> {
    return this.commandBus.execute(new ForgotPasswordCommand(dto));
  }

  async changePassword(dto: UpdatePasswordDto): Promise<void> {
    return this.commandBus.execute(new UpdatePasswordCommand(dto));
  }
}
