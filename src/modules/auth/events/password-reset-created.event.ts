import { User } from '@/modules/users/entities/user.entity';
import { PasswordReset } from '../entities/password-reset.entity';

export class PasswordResetCreatedEvent {
  constructor(
    public readonly user: User,
    public readonly passwordReset: PasswordReset,
  ) {}
}
