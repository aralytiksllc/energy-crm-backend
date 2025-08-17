// External
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import type { Branch } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { FindOneBranchQuery } from './find-one-branch.query';

@QueryHandler(FindOneBranchQuery)
export class FindOneBranchHandler implements IQueryHandler<FindOneBranchQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindOneBranchQuery): Promise<Branch> {
    const branch = await this.prisma.branch.findUnique({
      where: { id: query.id },
    });

    if (!branch) {
      throw new NotFoundException('Branch not found.');
    }

    return branch;
  }
}
