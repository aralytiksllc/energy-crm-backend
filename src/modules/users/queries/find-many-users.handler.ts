// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { PrismaService } from '@/prisma/prisma.service';
import { type PrismaExtension } from '@/prisma/prisma.extension';
import { type User } from '@/prisma/prisma.client';
import { FindManyUsersQuery } from './find-many-users.query';

@QueryHandler(FindManyUsersQuery)
export class FindManyUsersHandler
  implements IQueryHandler<FindManyUsersQuery, Paginate<User>>
{
  constructor(
    @Inject('PrismaService')
    private readonly prismaService: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindManyUsersQuery): Promise<Paginate<User>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prismaService.client.$transaction([
      this.prismaService.client.user.findMany(findOptions),
      this.prismaService.client.user.count({ where: findOptions.where }),
    ]);

    return new Paginate(rows, count, findOptions.skip, findOptions.take);
  }
}
