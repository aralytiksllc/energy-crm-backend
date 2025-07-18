// External dependencies

// Internal dependencies
import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { User } from '@/modules/users/entities/user.entity';

export class FindManyUsersQuery extends FindManyQuery<User> {}
