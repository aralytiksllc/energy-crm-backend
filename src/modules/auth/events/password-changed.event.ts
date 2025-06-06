import { User } from '@/entities/user.entity';

export class PasswordChangedEvent {
  constructor(public readonly user: User) {}
}
