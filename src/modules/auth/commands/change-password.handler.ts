import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, Op } from 'sequelize';
import { BadRequestException } from '@nestjs/common';
import { User } from '@/models/user.model';
import { PasswordReset } from '@/models/password-reset.model';
import { PasswordChangedEvent } from '../events/password-changed.event';
import { ChangePasswordCommand } from './change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(
    private readonly sequelize: Sequelize,

    private readonly eventBus: EventBus,

    @InjectModel(User)
    private readonly userModel: typeof User,

    @InjectModel(PasswordReset)
    private readonly passwordResetModel: typeof PasswordReset,
  ) {}

  public async execute(command: ChangePasswordCommand): Promise<void> {
    const { email, password, token } = command.dto;

    const passwordReset = await this.findValidResetToken(email, token);

    const user = await this.findActiveUserByEmail(email);

    const transaction = await this.sequelize.transaction();

    try {
      await user.update({ password }, { transaction });

      await passwordReset.destroy({ transaction });

      await transaction.commit();

      this.eventBus.publish(new PasswordChangedEvent(user));
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  private async findActiveUserByEmail(email: string): Promise<User> {
    const where = { email, isActive: true };

    const user = await this.userModel.findOne({ where });

    if (!user) {
      throw new BadRequestException('User not found or inactive.');
    }

    return user;
  }

  private async findValidResetToken(
    email: string,
    token: string,
  ): Promise<PasswordReset> {
    const where = { email, token, expiresAt: { [Op.gte]: new Date() } };

    const passwordReset = await this.passwordResetModel.findOne({ where });

    if (!passwordReset) {
      throw new BadRequestException('Invalid or expired reset token.');
    }

    return passwordReset;
  }
}
