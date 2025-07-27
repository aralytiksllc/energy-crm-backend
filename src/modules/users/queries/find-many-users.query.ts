// External dependencies

// Internal dependencies
import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { User } from '../entities/user.entity';

export class FindManyUserQuery extends FindManyQuery<User> {}
