// External dependencies
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { History } from '@prisma/client';

// Internal dependencies
import { PrismaService } from '@/prisma/prisma.service';
import { Paged } from '@/common/paged/paged.impl';
import { FindManyHistoriesQuery } from './find-many-histories.query';

@QueryHandler(FindManyHistoriesQuery)
export class FindManyHistoriesHandler
  implements IQueryHandler<FindManyHistoriesQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindManyHistoriesQuery): Promise<Paged<History>> {
    const queryOptions = query.toQueryOptions();

    const [items, total] = await Promise.all([
      this.prismaService.history.findMany(queryOptions),
      this.prismaService.history.count({ where: queryOptions.where }),
    ]);

    return new Paged(items, total, query.current, query.pageSize);
  }
}
