// External
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { type Document } from '@/common/prisma/prisma.client';
import { CreateDocumentCommand } from './commands/create-document.command';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { DeleteDocumentCommand } from './commands/delete-document.command';
import { FindManyDocumentsDto } from './dtos/find-many-documents.dto';
import { FindManyDocumentsQuery } from './queries/find-many-documents.query';
import { FindOneDocumentQuery } from './queries/find-one-document.query';
import { UpdateDocumentCommand } from './commands/update-document.command';
import { UpdateDocumentDto } from './dtos/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(dto: FindManyDocumentsDto): Promise<Paginate<Document>> {
    const query = new FindManyDocumentsQuery(dto);
    return this.queryBus.execute(query);
  }

  async findOne(id: number): Promise<Document> {
    const query = new FindOneDocumentQuery(id);
    return this.queryBus.execute(query);
  }

  async create(
    file: Express.Multer.File,
    dto: CreateDocumentDto,
  ): Promise<Document> {
    const command = new CreateDocumentCommand(file, dto);
    return this.commandBus.execute(command);
  }

  async update(
    id: number,
    file: Express.Multer.File,
    dto: UpdateDocumentDto,
  ): Promise<Document> {
    const command = new UpdateDocumentCommand(id, file, dto);
    return this.commandBus.execute(command);
  }

  async delete(id: number): Promise<Document> {
    const command = new DeleteDocumentCommand(id);
    return this.commandBus.execute(command);
  }
}
