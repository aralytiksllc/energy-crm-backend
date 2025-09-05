// External
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

// Internal
import { Paginate } from '@/common/paginate';
import { type Document } from '@/common/prisma/prisma.client';
import { CreateDocumentDto } from './dtos/create-document.dto';
import { FindManyDocumentsDto } from './dtos/find-many-documents.dto';
import { UpdateDocumentDto } from './dtos/update-document.dto';
import { FindManyDocumentsPipe } from './pipes/find-many-documents.pipe';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  findMany(
    @Query(FindManyDocumentsPipe) dto: FindManyDocumentsDto,
  ): Promise<Paginate<Document>> {
    return this.documentService.findMany(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Document> {
    return this.documentService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateDocumentDto,
  ) {
    return this.documentService.create(file, dto);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateDocumentDto,
  ): Promise<Document> {
    return this.documentService.update(id, file, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Document> {
    return this.documentService.delete(id);
  }
}
