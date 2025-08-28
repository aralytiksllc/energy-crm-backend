// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { Contact } from '@/prisma/prisma.client';
import { PrismaService } from '@/prisma/prisma.service';
import { FindManyContactsQuery } from './find-many-contacts.query';

@QueryHandler(FindManyContactsQuery)
export class FindManyContactsHandler implements IQueryHandler<FindManyContactsQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindManyContactsQuery): Promise<Paged<Contact>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prismaService.$transaction([
      this.prismaService.contact.findMany(findOptions),
      this.prismaService.contact.count({ where: findOptions.where }),
    ]);

    return new Paged(rows, count, 1, 1);
  }
}
