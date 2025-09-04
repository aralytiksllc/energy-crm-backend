// External
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { Token } from '@/common/token/token.impl';
import { DateTime } from '@/common/datetime/datetime.impl';
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Prisma } from '@/common/prisma/prisma.client';
import { PasswordResetCreatedEvent } from '../events/password-reset-created.event';
import { ForgotPasswordCommand } from './forgot-password.command';

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler
  implements ICommandHandler<ForgotPasswordCommand, void>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
    private readonly eventBus: EventBus,
  ) {}

  public async execute(command: ForgotPasswordCommand): Promise<void> {
    const user = await this.prisma.client.user.findUniqueOrThrow({
      where: { email: command.dto.email },
    });

    const data: Prisma.PasswordResetCreateInput = {
      token: Token.generate(),
      expiresAt: DateTime.expiresInHours(15),
      user: { connect: { id: user.id } },
    };

    const passwordReset = await this.prisma.client.passwordReset.create({
      data,
    });

    this.eventBus.publish(new PasswordResetCreatedEvent(user, passwordReset));
  }
}
