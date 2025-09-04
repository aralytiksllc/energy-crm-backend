// External
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import type { Contract } from '@/prisma/prisma.service';
import { PrismaService } from '@/prisma/prisma.service';
import { FindOneContractQuery } from './find-one-contract.query';

@QueryHandler(FindOneContractQuery)
export class FindOneContractHandler
  implements IQueryHandler<FindOneContractQuery>
{
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindOneContractQuery): Promise<Contract> {
    const contract = await this.prisma.contract.findUnique({
      where: { id: query.id },
    });

    if (!contract) {
      throw new NotFoundException('Contract not found.');
    }

    return contract;
  }
}
