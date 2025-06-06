import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomInt } from 'crypto';
import { addHours } from 'date-fns';
import { User } from '@/modules/users/entities/user.entity';
import { PasswordReset } from '../entities/password-reset.entity';
import { CreatePasswordResetDto } from '../dtos/create-password-reset.dto';
import { PasswordResetCreatedEvent } from '../events/password-reset-created.event';
import { ForgotPasswordCommand } from './forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(PasswordReset)
    private readonly passwordResetsRepository: Repository<PasswordReset>,

    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: ForgotPasswordCommand): Promise<void> {
    const { email } = command.dto;

    const user = await this.findActiveUserOrFail(email);

    const dto = new CreatePasswordResetDto();

    dto.email = email;

    dto.code = randomInt(100000, 999999);

    dto.expiresAt = addHours(new Date(), 1);

    const passwordReset = this.passwordResetsRepository.create(dto);

    await this.passwordResetsRepository.save(passwordReset);

    this.eventBus.publish(new PasswordResetCreatedEvent(user, passwordReset));
  }

  private async findActiveUserOrFail(email: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    if (!user.isActive) {
      throw new ForbiddenException('User account is inactive.');
    }

    return user;
  }
}
