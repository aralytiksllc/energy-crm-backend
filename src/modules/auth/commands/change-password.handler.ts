import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DataSource, MoreThanOrEqual, Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { PasswordReset } from '@/entities/password-reset.entity';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { PasswordChangedEvent } from '../events/password-changed.event';
import { ChangePasswordCommand } from './change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(
    private readonly dataSource: DataSource,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: ChangePasswordCommand): Promise<void> {
    const { dto } = command;

    await this.dataSource.transaction(async (manager) => {
      const passwordResetsRepository = manager.getRepository(PasswordReset);
      const usersRepository = manager.getRepository(User);

      const passwordReset = await this.findValidPasswordResetOrFail(
        passwordResetsRepository,
        dto,
      );

      const user = await this.findActiveUserOrFail(usersRepository, dto);

      user.password = dto.password;

      await usersRepository.save(user);

      await passwordResetsRepository.remove(passwordReset);

      this.eventBus.publish(new PasswordChangedEvent(user));
    });
  }

  private async findActiveUserOrFail(
    repository: Repository<User>,
    dto: ChangePasswordDto,
  ): Promise<User> {
    const { email } = dto;

    const user = await repository.findOneByOrFail({ email });

    if (!user.isActive) {
      throw new ForbiddenException('User account is inactive.');
    }

    return user;
  }

  private async findValidPasswordResetOrFail(
    repository: Repository<PasswordReset>,
    dto: ChangePasswordDto,
  ): Promise<PasswordReset> {
    const { email, code } = dto;

    const where = { email, code, expiresAt: MoreThanOrEqual(new Date()) };

    const passwordReset = await repository.findOneBy(where);

    if (!passwordReset) {
      throw new BadRequestException('Invalid or expired reset code.');
    }

    return passwordReset;
  }
}
