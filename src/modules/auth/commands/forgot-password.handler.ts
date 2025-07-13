// External dependencies
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { addHours } from 'date-fns';

// Internal dependencies
import { PrismaService } from '@/prisma/prisma.service';
import { Token } from '@/common/token/token.impl';
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
    const { dto } = command;

    const user = await this.getActiveUserOrThrow(dto.email);

    const passwordReset = await this.prismaService.passwordReset.create({
      data: {
        email: user.email,
        token: Token.generate(),
        expiresAt: addHours(new Date(), 1),
      },
    });

    this.eventBus.publish(new PasswordResetCreatedEvent(user, passwordReset));
  }

  private async getActiveUserOrThrow(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User with this email does not exist.');
    }

    if (!user.isActive) {
      throw new ForbiddenException('User account is inactive.');
    }

    return user;
  }
}
