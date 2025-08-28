// External
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

// Internal
import { CreateContactHandler } from './commands/create-contact.handler';
import { DeleteContactHandler } from './commands/delete-contact.handler';
import { FindManyContactsPipe } from './pipes/find-many-contacts.pipe';
import { FindManyContactsHandler } from './queries/find-many-contacts.handler';
import { FindOneContactHandler } from './queries/find-one-contact.handler';
import { PrismaModule } from '@/prisma/prisma.module';
import { UpdateContactHandler } from './commands/update-contact.handler';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { ContactSeed } from './contact.seed';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [ContactController],
  providers: [
    FindManyContactsPipe,
    FindManyContactsHandler,
    FindOneContactHandler,
    CreateContactHandler,
    UpdateContactHandler,
    DeleteContactHandler,
    ContactService,
    ContactSeed,
  ],
  exports: [ContactService],
})
export class ContactModule {}
