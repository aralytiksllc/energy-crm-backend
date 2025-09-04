// External
import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// Internal
import type { Contact } from '@/prisma/prisma.service';
import { PrismaService } from '@/prisma/prisma.service';
import { FindOneContactQuery } from './find-one-contact.query';

@QueryHandler(FindOneContactQuery)
export class FindOneContactHandler implements IQueryHandler<FindOneContactQuery> {
  constructor(private readonly prisma: PrismaService) {}

  async execute(query: FindOneContactQuery): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: { id: query.id },
    });

    if (!contact) {
      throw new NotFoundException('Contact not found.');
    }

    return contact;
  }
}
