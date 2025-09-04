// External
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import { Paginate } from '@/common/paginate';
import type { Contact } from '@/prisma/prisma.service';
import { PrismaService } from '@/prisma/prisma.service';
import { FindManyContactsQuery } from './find-many-contacts.query';

@QueryHandler(FindManyContactsQuery)
export class FindManyContactsHandler implements IQueryHandler<FindManyContactsQuery> {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(query: FindManyContactsQuery): Promise<Paginate<Contact>> {
    const findOptions = query.dto.findOptions;

    const [rows, count] = await this.prismaService.$transaction([
      this.prismaService.contact.findMany(findOptions),
      this.prismaService.contact.count({ where: findOptions.where }),
    ]);

    return new Paginate(rows, count, 1, 1);
  }
}
