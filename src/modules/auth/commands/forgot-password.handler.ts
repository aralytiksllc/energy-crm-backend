import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from '@/common/token';
import { User } from '@/models/user.model';
import { PasswordReset } from '@/models/password-reset.model';
import { PasswordResetCreatedEvent } from '../events/password-reset-created.event';
import { ForgotPasswordCommand } from './forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,

    @InjectModel(PasswordReset)
    private readonly passwordResetModel: typeof PasswordReset,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: ForgotPasswordCommand): Promise<void> {
    const { email } = command.dto;

    const user = await this.findActiveUserByEmail(email);

    if (!user) return;

    const token = Token.generate();

    const expiresAt = new Date();

    expiresAt.setHours(expiresAt.getHours() + 1);

    const passwordReset = await this.passwordResetModel.create({
      email,
      token,
      expiresAt,
    });

    this.eventBus.publish(new PasswordResetCreatedEvent(user, passwordReset));
  }

  private async findActiveUserByEmail(email: string): Promise<Nullable<User>> {
    const where = { email, isActive: true };
    return this.userModel.findOne({ where });
  }
}
