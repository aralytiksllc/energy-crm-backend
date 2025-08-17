// External
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

// Internal
import { Token } from '@/common/token/token.impl';
import { DateTime } from '@/common/datetime/datetime.impl';
import { PrismaService } from '@/prisma/prisma.service';
import { PasswordResetCreatedEvent } from '../events/password-reset-created.event';
import { ForgotPasswordCommand } from './forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  implements ICommandHandler<ForgotPasswordCommand>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: ForgotPasswordCommand): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { email: command.dto.email },
    });

    if (!user) throw new NotFoundException('User not found.');

    const passwordReset = await this.prismaService.passwordReset.create({
      data: {
        userId: user.id,
        token: Token.generate(),
        expiresAt: DateTime.expiresInHours(15),
      },
    });

    this.eventBus.publish(new PasswordResetCreatedEvent(user, passwordReset));
  }
}
