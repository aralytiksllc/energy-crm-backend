// External
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Internal
import { CreateDocumentHandler } from './commands/create-document.handler';
import { DeleteDocumentHandler } from './commands/delete-document.handler';
import { FindManyDocumentsPipe } from './pipes/find-many-documents.pipe';
import { FindManyDocumentsHandler } from './queries/find-many-documents.handler';
import { FindOneDocumentHandler } from './queries/find-one-document.handler';
import { PrismaModule } from '@/prisma/prisma.module';
import { UpdateDocumentHandler } from './commands/update-document.handler';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { DocumentSeed } from './document.seed';

@Module({
  imports: [
    CqrsModule,
    PrismaModule,
  ],
  controllers: [DocumentController],
  providers: [
    FindManyDocumentsPipe,
    FindManyDocumentsHandler,
    FindOneDocumentHandler,
    CreateDocumentHandler,
    UpdateDocumentHandler,
    DeleteDocumentHandler,
    DocumentService,
    DocumentSeed,
  ],
  exports: [DocumentService],
})
export class DocumentModule {}
