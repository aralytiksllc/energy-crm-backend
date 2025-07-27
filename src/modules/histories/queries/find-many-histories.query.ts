// External dependencies

// Internal dependencies
import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { History } from '../entities/history.entity';

export class FindManyHistoryQuery extends FindManyQuery<History> {}
