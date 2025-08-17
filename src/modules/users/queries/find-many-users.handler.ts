// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { User } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { FindManyUsersQuery } from './find-many-users.query';

@QueryHandler(FindManyUsersQuery)
export class FindManyUsersHandler implements IQueryHandler<FindManyUsersQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindManyUsersQuery): Promise<Paged<User>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prismaService.$transaction([
      this.prismaService.user.findMany(findOptions),
      this.prismaService.user.count({ where: findOptions.where }),
    ]);

    return new Paged(rows, count, 1, 1);
  }
}
