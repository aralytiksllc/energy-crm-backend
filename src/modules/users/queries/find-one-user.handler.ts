// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type Prisma, type User } from '@/prisma/prisma.client';
import { FindOneUserQuery } from './find-one-user.query';

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery> {
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindOneUserQuery): Promise<User> {
    const findUniqueOprions: Prisma.UserFindUniqueOrThrowArgs = {
      where: { id: query.id },
      include: {
        role: { include: { permissions: true } },
        department: true,
      },
    };

    return await this.prismaService.client.user.findUniqueOrThrow(
      findUniqueOprions,
    );
  }
}
