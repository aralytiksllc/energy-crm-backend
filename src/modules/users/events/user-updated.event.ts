// External dependencies
import { User } from '@prisma/client';

// Internal dependencies

export class UserUpdatedEvent {
  constructor(public readonly user: User) {}
}
