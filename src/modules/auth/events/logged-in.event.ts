// External dependencies
import { User } from '@prisma/client';

// Internal dependencies

export class LoggedInEvent {
  constructor(public readonly user: User) {}
}
