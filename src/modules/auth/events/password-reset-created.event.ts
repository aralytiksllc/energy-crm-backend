import { User } from '@/models/user.model';
import { PasswordReset } from '@/models/password-reset.model';

export class PasswordResetCreatedEvent {
  constructor(
    public readonly user: User,
    public readonly passwordReset: PasswordReset,
  ) {}
}
