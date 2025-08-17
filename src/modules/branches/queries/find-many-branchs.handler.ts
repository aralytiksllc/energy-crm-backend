// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { Branch } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { FindManyBranchsQuery } from './find-many-branchs.query';

@QueryHandler(FindManyBranchsQuery)
export class FindManyBranchsHandler implements IQueryHandler<FindManyBranchsQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindManyBranchsQuery): Promise<Paged<Branch>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prismaService.$transaction([
      this.prismaService.branch.findMany(findOptions),
      this.prismaService.branch.count({ where: findOptions.where }),
    ]);

    return new Paged(rows, count, 1, 1);
  }
}
