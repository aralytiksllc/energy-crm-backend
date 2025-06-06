import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { User } from '../entities/user.entity';

export class FindManyUsersQuery extends FindManyQuery<User> {}
