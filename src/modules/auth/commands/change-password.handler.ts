// External
import { ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { Hash } from '@/common/hash/hash.impl';
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type User } from '@/common/prisma/prisma.client';
import { PasswordChangedEvent } from '../events/password-changed.event';
import { ChangePasswordCommand } from './change-password.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand, User>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: ChangePasswordCommand): Promise<User> {
    const { userId, password, token } = command.dto;

    const user = await this.prisma.client.$transaction(async (tx) => {
      const { count } = await tx.passwordReset.deleteMany({
        where: { token, userId, expiresAt: { gt: new Date() } },
      });

      if (count === 0) {
        throw new ForbiddenException('Invalid token.');
      }

      const hashedPassword = await Hash.make(password);

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      return updatedUser;
    });

    this.eventBus.publish(new PasswordChangedEvent(user));

    return user;
  }
}
