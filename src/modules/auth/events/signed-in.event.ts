import { User } from '@/entities/user.entity';

export class SignedInEvent {
  constructor(public readonly user: User) {}
}
