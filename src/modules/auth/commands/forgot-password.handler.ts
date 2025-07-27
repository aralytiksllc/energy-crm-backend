// External dependencies
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';

// Internal dependencies
import { User } from '@/modules/users/entities/user.entity';
import { PasswordReset } from '@/modules/users/entities/password-reset.entity';
import { PasswordResetCreatedEvent } from '../events/password-reset-created.event';
import { ForgotPasswordCommand } from './forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,

    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: EntityRepository<PasswordReset>,

    private readonly entityManager: EntityManager,

    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: ForgotPasswordCommand): Promise<void> {
    const { email } = command.dto;

    const user = await this.userRepository.findOneOrFail({ email });

    const passwordReset = this.passwordResetRepository.create({ user });

    user.passwordResets.add(passwordReset);

    await this.entityManager.flush();

    this.eventBus.publish(new PasswordResetCreatedEvent(user, passwordReset));
  }
}
