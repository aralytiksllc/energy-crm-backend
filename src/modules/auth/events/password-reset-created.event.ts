// External dependencies
import { User, PasswordReset } from '@prisma/client';

// Internal dependencies

export class PasswordResetCreatedEvent {
  constructor(
    public readonly user: User,
    public readonly passwordReset: PasswordReset,
  ) {}
}
