// External dependencies

// Internal dependencies
import { User } from '@/modules/users/entities/user.entity';

export class LoggedInEvent {
  constructor(public readonly user: User) {}
}
