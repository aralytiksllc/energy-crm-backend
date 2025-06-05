import { User } from '@/models/user.model';

export class PasswordChangedEvent {
  constructor(public readonly user: User) {}
}
