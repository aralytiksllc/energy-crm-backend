// External dependencies
import { User } from '@prisma/client';

// Internal dependencies

export class UserCreatedEvent {
  constructor(public readonly user: User) {}
}
