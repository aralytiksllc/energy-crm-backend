import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Hash } from '@/common/hash';
import { PasswordReset } from '@/models/password-reset.model';
import { UsersService } from '@/modules/users/users.service';
import { ResetPasswordCommand } from './reset-password.command';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler
  implements ICommandHandler<ResetPasswordCommand>
{
  constructor(
    @InjectModel(PasswordReset)
    private readonly passwordResetModel: typeof PasswordReset,
    private readonly usersService: UsersService,
  ) {}

  async execute(command: ResetPasswordCommand): Promise<void> {
    try {
      const { email, password, token } = command.dto;

      const user = await this.usersService.findByEmail(email);

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      const passwordReset = await this.passwordResetModel.findOne({
        where: { email, token, expiresAt: { [Op.gte]: new Date() } },
      });

      if (!passwordReset) {
        throw new BadRequestException('Invalid or expired reset token.');
      }

      const hashedPassword = await Hash.make(password);

      await this.usersService.update(user.id, { password: hashedPassword });

      await passwordReset.destroy();
    } catch (error) {}
  }
}
