// External
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

// Internal
import { EmailService } from '@/common/email/email.service';
import { PasswordResetCreatedEvent } from './password-reset-created.event';

@EventsHandler(PasswordResetCreatedEvent)
export class PasswordResetCreatedHandler
  implements IEventHandler<PasswordResetCreatedEvent>
{
  constructor(private readonly emailService: EmailService) {}

  async handle(event: PasswordResetCreatedEvent): Promise<void> {
    const { user, passwordReset } = event;

    const link = `https://energy-crm-frontend-875671653104.herokuapp.com/update-password?userId=${user.id}&token=${passwordReset.token}`;

    await this.emailService.sendWithRetryAsync({
      to: [user.email],
      subject: 'Reset your password',
      htmlBody: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
    });
  }
}
