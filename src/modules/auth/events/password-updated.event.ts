// External dependencies
import { User } from '@prisma/client';

// Internal dependencies

export class PasswordUpdatedEvent {
  constructor(public readonly user: User) {}
}
