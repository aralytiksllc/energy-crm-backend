import { ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { addHours } from 'date-fns';
import { Hash } from '@/common/hash';
import { User } from '@/entities/user.entity';
import { UsersRepository } from '@/modules/users/users.repository';
import { PasswordResetsRepository } from '../auth.repository';
import { CreatePasswordResetDto } from '../dtos/create-password-reset.dto';
import { PasswordResetCreatedEvent } from '../events/password-reset-created.event';
import { ForgotPasswordCommand } from './forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  constructor(
    private readonly passwordResetsRepository: PasswordResetsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: ForgotPasswordCommand): Promise<void> {
    const { email } = command.dto;

    const user = await this.findActiveUserOrFail(email);

    const dto = new CreatePasswordResetDto();

    dto.email = email;

    dto.token = await Hash.make(email);

    dto.expiresAt = addHours(new Date(), 1);

    const passwordReset = this.passwordResetsRepository.create(dto);

    await this.passwordResetsRepository.save(passwordReset);

    this.eventBus.publish(new PasswordResetCreatedEvent(user, passwordReset));
  }

  private async findActiveUserOrFail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneByOrFail({ email });

    if (!user.isActive) {
      throw new ForbiddenException('User account is inactive.');
    }

    return user;
  }
}
