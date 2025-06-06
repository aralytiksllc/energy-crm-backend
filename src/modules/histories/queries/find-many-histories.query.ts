import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { History } from '../entities/history.entity';

export class FindManyHistoriesQuery extends FindManyQuery<History> {}
