// External

// Internal
import { type User, type PasswordReset } from '@/common/prisma/prisma.client';

export class PasswordResetCreatedEvent {
  constructor(
    public readonly user: User,
    public readonly passwordReset: PasswordReset,
  ) {}
}
