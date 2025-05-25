import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Logger } from '@nestjs/common';
import { Token } from '@/common/token';
import { PasswordReset } from '@/models/password-reset.model';
import { UsersService } from '@/modules/users/users.service';
import { ForgotPasswordCommand } from './forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  private readonly logger = new Logger(ForgotPasswordHandler.name);

  constructor(
    @InjectModel(PasswordReset)
    private readonly passwordResetModel: typeof PasswordReset,
    private readonly usersService: UsersService,
  ) {}

  async execute(command: ForgotPasswordCommand): Promise<void> {
    try {
      const { email } = command.dto;

      const user = await this.usersService.findByEmail(email);

      if (user) {
        const token = Token.generate();

        const expiresAt = new Date();

        expiresAt.setHours(expiresAt.getHours() + 1);

        await this.passwordResetModel.create({ email, token, expiresAt });
      }
    } catch (error) {}
  }
}
