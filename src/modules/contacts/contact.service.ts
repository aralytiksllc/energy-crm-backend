// External
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { Contact } from '@/prisma/prisma.client';
import { CreateContactCommand } from './commands/create-contact.command';
import { CreateContactDto } from './dtos/create-contact.dto';
import { DeleteContactCommand } from './commands/delete-contact.command';
import { FindManyContactsDto } from './dtos/find-many-contacts.dto';
import { FindManyContactsQuery } from './queries/find-many-contacts.query';
import { FindOneContactQuery } from './queries/find-one-contact.query';
import { UpdateContactCommand } from './commands/update-contact.command';
import { UpdateContactDto } from './dtos/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(dto: FindManyContactsDto): Promise<Paged<Contact>> {
    const query = new FindManyContactsQuery(dto);
    return this.queryBus.execute(query);
  }

  async findOne(id: number): Promise<Contact> {
    const query = new FindOneContactQuery(id);
    return this.queryBus.execute(query);
  }

  async create(dto: CreateContactDto): Promise<Contact> {
    const command = new CreateContactCommand(dto);
    return this.commandBus.execute(command);
  }

  async update(id: number, dto: UpdateContactDto): Promise<Contact> {
    const command = new UpdateContactCommand(id, dto);
    return this.commandBus.execute(command);
  }

  async delete(id: number): Promise<Contact> {
    const command = new DeleteContactCommand(id);
    return this.commandBus.execute(command);
  }
}
