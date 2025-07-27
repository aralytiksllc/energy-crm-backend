// External dependencies

// Internal dependencies
import { FindOneQuery } from '@/common/cqrs/queries/find-one.query';
import { User } from '../entities/user.entity';

export class FindOneUserQuery extends FindOneQuery<User> {}
