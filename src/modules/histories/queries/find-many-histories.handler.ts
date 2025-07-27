// External dependencies
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

// Internal dependencies
import { Paged } from '@/common/paged';
import { History } from '../entities/history.entity';
import { FindManyHistoryQuery } from './find-many-histories.query';

@QueryHandler(FindManyHistoryQuery)
export class FindManyHistoryHandler
  implements IQueryHandler<FindManyHistoryQuery>
{
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: EntityRepository<History>,
  ) {}

  async execute(query: FindManyHistoryQuery): Promise<Paged<History>> {
    const [rows, count] = await this.historyRepository.findAndCount({}, {});

    return new Paged(rows, count, query.current, query.pageSize);
  }
}
