import { User } from '@/modules/users/entities/user.entity';

export class SignedInEvent {
  constructor(public readonly user: User) {}
}
