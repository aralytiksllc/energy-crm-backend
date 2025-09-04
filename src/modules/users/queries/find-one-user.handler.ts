// External
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Prisma, type User } from '@/common/prisma/prisma.client';
import { FindOneUserQuery } from './find-one-user.query';

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery> {
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindOneUserQuery): Promise<User> {
    const findUniqueOprions: Prisma.UserFindUniqueOrThrowArgs = {
      where: { id: query.id },

      include: {
        role: { include: { permissions: true } },

        department: true,
      },
    };

    return await this.prisma.client.user.findUniqueOrThrow(findUniqueOprions);
  }
}
