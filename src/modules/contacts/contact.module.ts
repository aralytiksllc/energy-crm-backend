// External
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

// Internal
import { CreateContactHandler } from './commands/create-contact.handler';
import { DeleteContactHandler } from './commands/delete-contact.handler';
import { FindManyContactsPipe } from './pipes/find-many-contacts.pipe';
import { FindManyContactsHandler } from './queries/find-many-contacts.handler';
import { FindOneContactHandler } from './queries/find-one-contact.handler';
import { UpdateContactHandler } from './commands/update-contact.handler';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [CqrsModule],
  controllers: [ContactController],
  providers: [
    FindManyContactsPipe,
    FindManyContactsHandler,
    FindOneContactHandler,
    CreateContactHandler,
    UpdateContactHandler,
    DeleteContactHandler,
    ContactService,
  ],
  exports: [ContactService],
})
export class ContactModule {}
