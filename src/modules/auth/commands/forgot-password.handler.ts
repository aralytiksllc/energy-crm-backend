import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { addHours } from 'date-fns';
import { Token } from '@/common/token';
import { User } from '@/entities/user.entity';
import { UsersRepository } from '@/modules/users/users.repository';
import { PasswordResetsRepository } from '../auth.repository';
import { PasswordResetCreatedEvent } from '../events/password-reset-created.event';
import { ForgotPasswordCommand } from './forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  constructor(
    private readonly passwordResets: PasswordResetsRepository,
    private readonly users: UsersRepository,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: ForgotPasswordCommand): Promise<void> {
    const { dto } = command;

    const user = await this.getActiveUserOrThrow(dto.email);

    const resetRequest = this.passwordResets.create({
      email: user.email,
      token: Token.generate(),
      expiresAt: addHours(new Date(), 1),
    });

    await this.passwordResets.save(resetRequest);

    this.eventBus.publish(new PasswordResetCreatedEvent(user, resetRequest));
  }

  private async getActiveUserOrThrow(email: string): Promise<User> {
    const user = await this.users.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }

    if (!user.isActive) {
      throw new ForbiddenException('User account is inactive.');
    }

    return user;
  }
}
