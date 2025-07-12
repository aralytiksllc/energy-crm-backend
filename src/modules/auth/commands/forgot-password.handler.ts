// External dependencies
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { addHours } from 'date-fns';

// Internal dependencies
import { Token } from '@/common/token';
import { User } from '@/modules/users/entities/user.entity';
import { PasswordReset } from '../entities/password-reset.entity';
import { PasswordResetCreatedEvent } from '../events/password-reset-created.event';
import { ForgotPasswordCommand } from './forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  constructor(
    private readonly passwordResetRepository: Repository<PasswordReset>,
    private readonly userRepository: Repository<User>,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: ForgotPasswordCommand): Promise<void> {
    const { dto } = command;

    const user = await this.getActiveUserOrThrow(dto.email);

    const entity = this.passwordResetRepository.create({
      email: user.email,
      token: Token.generate(),
      expiresAt: addHours(new Date(), 1),
    });

    const resetRequest = await this.passwordResetRepository.save(entity);

    this.eventBus.publish(new PasswordResetCreatedEvent(user, resetRequest));
  }

  private async getActiveUserOrThrow(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }

    if (!user.isActive) {
      throw new ForbiddenException('User account is inactive.');
    }

    return user;
  }
}
