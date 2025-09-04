// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Branch } from '@/common/prisma/prisma.client';
import { FindOneBranchQuery } from './find-one-branch.query';

@QueryHandler(FindOneBranchQuery)
export class FindOneBranchHandler
  implements IQueryHandler<FindOneBranchQuery, Branch>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindOneBranchQuery): Promise<Branch> {
    return await this.prisma.client.branch.findUniqueOrThrow({
      where: { id: query.id },
    });
  }
}
