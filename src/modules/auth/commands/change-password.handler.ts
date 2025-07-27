// External dependencies
import { ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, EntityManager } from '@mikro-orm/postgresql';

// Internal dependencies
import { User } from '@/modules/users/entities/user.entity';
import { PasswordReset } from '@/modules/users/entities/password-reset.entity';
import { PasswordChangedEvent } from '../events/password-changed.event';
import { ChangePasswordCommand } from './change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: EntityRepository<PasswordReset>,

    private readonly entityManager: EntityManager,

    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: ChangePasswordCommand): Promise<void> {
    const { userId, password, token } = command.dto;

    const user = await this.userRepository.findOneOrFail(
      { id: userId },
      { populate: ['passwordResets'] },
    );

    const passwordReset = await this.passwordResetRepository.findOneOrFail({
      token,
    });

    if (!user.passwordResets.contains(passwordReset)) {
      throw new ForbiddenException('Token does not belong to user.');
    }

    user.password = password;

    user.passwordResets.remove(passwordReset);

    await this.entityManager.removeAndFlush(passwordReset);

    this.eventBus.publish(new PasswordChangedEvent(user));
  }
}
