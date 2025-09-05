// External
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

// Internal
import { CreateDocumentHandler } from './commands/create-document.handler';
import { DeleteDocumentHandler } from './commands/delete-document.handler';
import { FindManyDocumentsPipe } from './pipes/find-many-documents.pipe';
import { FindManyDocumentsHandler } from './queries/find-many-documents.handler';
import { FindOneDocumentHandler } from './queries/find-one-document.handler';
import { UpdateDocumentHandler } from './commands/update-document.handler';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [CqrsModule],
  controllers: [DocumentController],
  providers: [
    FindManyDocumentsPipe,
    FindManyDocumentsHandler,
    FindOneDocumentHandler,
    CreateDocumentHandler,
    UpdateDocumentHandler,
    DeleteDocumentHandler,
    DocumentService,
  ],
  exports: [DocumentService],
})
export class DocumentModule {}
