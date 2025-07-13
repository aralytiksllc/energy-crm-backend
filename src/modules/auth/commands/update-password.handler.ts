// External dependencies
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal dependencies
import { PrismaService } from '@/prisma/prisma.service';
import { Hash } from '@/common/hash/hash.impl';
import { PasswordUpdatedEvent } from '../events/password-updated.event';
import { UpdatePasswordCommand } from './update-password.command';

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordHandler
  implements ICommandHandler<UpdatePasswordCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: UpdatePasswordCommand): Promise<void> {
    const { dto } = command;

    await this.prismaService.$transaction(async (tx) => {
      const passwordReset = await tx.passwordReset.findFirst({
        where: { token: dto.token, expiresAt: { gte: new Date() } },
      });

      if (!passwordReset) {
        throw new BadRequestException('Invalid or expired reset token.');
      }

      const user = await tx.user.findUnique({
        where: { email: passwordReset.email },
      });

      if (!user) {
        throw new BadRequestException('User with this email does not exist.');
      }

      if (!user.isActive) {
        throw new ForbiddenException('User account is inactive.');
      }

      if (dto.password) {
        dto.password = await Hash.make(dto.password);
      }

      await tx.user.update({
        where: { id: user.id },
        data: { password: dto.password },
      });

      await tx.passwordReset.delete({
        where: { id: passwordReset.id },
      });

      this.eventBus.publish(new PasswordUpdatedEvent(user));
    });
  }
}
