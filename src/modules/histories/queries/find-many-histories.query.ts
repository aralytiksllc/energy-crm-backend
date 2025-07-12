// External dependencies

// Internal dependencies
import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { History } from '@/modules/histories/entities/history.entity';

export class FindManyHistoriesQuery extends FindManyQuery<History> {}
