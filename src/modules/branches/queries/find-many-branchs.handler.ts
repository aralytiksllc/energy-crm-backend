// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Branch } from '@/common/prisma/prisma.client';
import { FindManyBranchsQuery } from './find-many-branchs.query';

@QueryHandler(FindManyBranchsQuery)
export class FindManyBranchsHandler
  implements IQueryHandler<FindManyBranchsQuery, Paginate<Branch>>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindManyBranchsQuery): Promise<Paginate<Branch>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prisma.client.$transaction([
      this.prisma.client.branch.findMany(findOptions),
      this.prisma.client.branch.count({ where: findOptions.where }),
    ]);

    return new Paginate(rows, count, findOptions.skip, findOptions.take);
  }
}
