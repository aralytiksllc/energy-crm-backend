// External
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Contract } from '@/common/prisma/prisma.client';
import { FindOneContractQuery } from './find-one-contract.query';

@QueryHandler(FindOneContractQuery)
export class FindOneContractHandler
  implements IQueryHandler<FindOneContractQuery, Contract>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindOneContractQuery): Promise<Contract> {
    return await this.prisma.client.contract.findUniqueOrThrow({
      where: { id: query.id },
    });
  }
}
