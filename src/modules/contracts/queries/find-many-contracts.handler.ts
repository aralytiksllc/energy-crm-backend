// External
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Prisma, type Contract } from '@/common/prisma/prisma.client';
import { FindManyContractsQuery } from './find-many-contracts.query';

@QueryHandler(FindManyContractsQuery)
export class FindManyContractsHandler
  implements IQueryHandler<FindManyContractsQuery>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindManyContractsQuery): Promise<Paginate<Contract>> {
    const findOptions: Prisma.ContractFindManyArgs = {
      ...query.dto.findOptions,
      include: { customer: true },
    };

    const [rows, count] = await this.prisma.client.$transaction([
      this.prisma.client.contract.findMany(findOptions),
      this.prisma.client.contract.count({ where: findOptions.where }),
    ]);

    return new Paginate(rows, count, findOptions.skip, findOptions.take);
  }
}
