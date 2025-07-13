// External dependencies
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { User } from '@prisma/client';

// Internal dependencies
import { Paged } from '@/common/paged/paged.impl';
import { PrismaService } from '@/prisma/prisma.service';
import { FindManyUsersQuery } from './find-many-users.query';

@QueryHandler(FindManyUsersQuery)
export class FindManyUsersHandler implements IQueryHandler<FindManyUsersQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindManyUsersQuery): Promise<Paged<User>> {
    const options = query.toQueryOptions();

    const [items, total] = await Promise.all([
      this.prismaService.user.findMany(options),
      this.prismaService.user.count({ where: options.where }),
    ]);

    return new Paged(items, total, query.current, query.pageSize);
  }
}
