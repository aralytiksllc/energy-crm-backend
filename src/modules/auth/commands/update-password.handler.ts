import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DataSource, MoreThanOrEqual, EntityManager } from 'typeorm';
import { User } from '@/entities/user.entity';
import { PasswordReset } from '@/entities/password-reset.entity';
import { PasswordUpdatedEvent } from '../events/password-updated.event';
import { UpdatePasswordCommand } from './update-password.command';

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordHandler
  implements ICommandHandler<UpdatePasswordCommand>
{
  constructor(
    private readonly dataSource: DataSource,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: UpdatePasswordCommand): Promise<void> {
    const { dto } = command;
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const passwordReset = await this.findValidPasswordResetOrFail(
        queryRunner.manager,
        dto.token,
      );

      const user = await this.findActiveUserOrFail(
        queryRunner.manager,
        passwordReset.email,
      );

      user.password = dto.password;
      await queryRunner.manager.save(user);
      await queryRunner.manager.remove(passwordReset);

      await queryRunner.commitTransaction();

      this.eventBus.publish(new PasswordUpdatedEvent(user));
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async findValidPasswordResetOrFail(
    manager: EntityManager,
    token: string,
  ): Promise<PasswordReset> {
    const where = { token, expiresAt: MoreThanOrEqual(new Date()) };

    const passwordReset = await manager.findOneBy(PasswordReset, where);

    if (!passwordReset) {
      throw new BadRequestException('Invalid or expired reset token.');
    }

    return passwordReset;
  }

  private async findActiveUserOrFail(
    manager: EntityManager,
    email: string,
  ): Promise<User> {
    const where = { email };

    const user = await manager.findOneByOrFail(User, where);

    if (!user.isActive) {
      throw new ForbiddenException('User account is inactive.');
    }

    return user;
  }
}
