// External
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

// Internal
import { Paginate } from '@/common/paginate';
import type { Contract } from '@/prisma/prisma.service';
import { PrismaService } from '@/prisma/prisma.service';
import { FindManyContractsQuery } from './find-many-contracts.query';

@QueryHandler(FindManyContractsQuery)
export class FindManyContractsHandler
  implements IQueryHandler<FindManyContractsQuery>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindManyContractsQuery): Promise<Paginate<Contract>> {
    const findOptions = {
      ...query.dto.findOptions,
      include: { customer: true },
    };

    const [rows, count] = await this.prismaService.$transaction([
      this.prismaService.contract.findMany(findOptions),
      this.prismaService.contract.count({ where: findOptions.where }),
    ]);

    return new Paginate(rows, count, 1, 1);
  }
}
