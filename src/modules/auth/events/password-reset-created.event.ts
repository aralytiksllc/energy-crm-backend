import { User } from '@/models/user.model';
import { PasswordReset } from '@/modules/auth/entities/password-reset.model';

export class PasswordResetCreatedEvent {
  constructor(
    public readonly user: User,
    public readonly passwordReset: PasswordReset,
  ) {}
}
