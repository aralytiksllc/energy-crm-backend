import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Paged } from '@/common/paged';
import { History } from '@/entities/history.entity';
import { HistoriesRepository } from '../histories.repository';
import { FindManyHistoriesQuery } from './find-many-histories.query';

@QueryHandler(FindManyHistoriesQuery)
export class FindManyHistoriesHandler
  implements IQueryHandler<FindManyHistoriesQuery>
{
  constructor(private readonly historiesRepository: HistoriesRepository) {}

  async execute(query: FindManyHistoriesQuery): Promise<Paged<History>> {
    const options = query.toFindManyOptions();

    const [rows, count] = await this.historiesRepository.findAndCount(options);

    return new Paged(rows, count, query.current, query.pageSize);
  }
}
