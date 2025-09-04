// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { PrismaService } from '@/common/prisma/prisma.service';
import { type PrismaExtension } from '@/common/prisma/prisma.extension';
import { type Contact } from '@/common/prisma/prisma.client';
import { FindManyContactsQuery } from './find-many-contacts.query';

@QueryHandler(FindManyContactsQuery)
export class FindManyContactsHandler
  implements IQueryHandler<FindManyContactsQuery, Paginate<Contact>>
{
  constructor(
    @Inject('prisma')
    private readonly prisma: PrismaService<PrismaExtension>,
  ) {}

  async execute(query: FindManyContactsQuery): Promise<Paginate<Contact>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prisma.client.$transaction([
      this.prisma.client.contact.findMany(findOptions),
      this.prisma.client.contact.count({ where: findOptions.where }),
    ]);

    return new Paginate(rows, count, findOptions.skip, findOptions.take);
  }
}
