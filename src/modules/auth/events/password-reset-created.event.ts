// External
import type { User, PasswordReset } from '@prisma/client';

// Internal

export class PasswordResetCreatedEvent {
  constructor(
    public readonly user: User,
    public readonly passwordReset: PasswordReset,
  ) {}
}
