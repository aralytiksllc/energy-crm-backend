// External
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

// Internal
import { PasswordResetCreatedEvent } from './password-reset-created.event';
import { EmailService } from '@/common/email/email.service';

@EventsHandler(PasswordResetCreatedEvent)
export class PasswordResetCreatedHandler
  implements IEventHandler<PasswordResetCreatedEvent>
{
  constructor(private readonly emailService: EmailService) {}

  async handle(event: PasswordResetCreatedEvent): Promise<void> {
    try {
      const { user, passwordReset } = event;

      const link = `https://energy-crm-frontend-875671653104.herokuapp.com/update-password?userId=${user.id}&token=${passwordReset.token}`;

      await this.emailService.sendWithRetryAsync({
        to: [user.email],
        subject: 'Reset your password',
        htmlBody: `<p>Click <a href="${link}">here</a> to reset your password.</p>`,
      });
    } catch (error) {
      console.error(
        '[PasswordResetCreatedHandler] Failed to send email:',
        error,
      );
      // Opsionale: logim me logger-in e NestJS në vend të console
    }
  }
}
