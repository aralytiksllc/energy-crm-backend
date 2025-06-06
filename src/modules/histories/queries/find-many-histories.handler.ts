import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paged } from '@/common/paged';
import { History } from '../entities/history.entity';
import { FindManyHistoriesQuery } from './find-many-histories.query';

@QueryHandler(FindManyHistoriesQuery)
export class FindManyHistoriesHandler
  implements IQueryHandler<FindManyHistoriesQuery>
{
  constructor(
    @InjectRepository(History)
    private readonly historiesRepository: Repository<History>,
  ) {}

  async execute(query: FindManyHistoriesQuery): Promise<Paged<History>> {
    const options = query.toFindManyOptions();

    const [rows, count] = await this.historiesRepository.findAndCount(options);

    return new Paged(rows, count, query.current, query.pageSize);
  }
}
