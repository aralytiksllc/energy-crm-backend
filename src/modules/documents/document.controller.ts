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
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import { AzureStorageFileInterceptor } from '@/common/azure-storage';
import type { UploadedFileMetadata } from '@/common/azure-storage';
import type { Document } from '@/prisma/prisma.client';
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
  ): Promise<Paged<Document>> {
    return this.documentService.findMany(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Document> {
    return this.documentService.findOne(id);
  }

  @Post()
  @UseInterceptors(AzureStorageFileInterceptor('file'))
  async upload(
    @UploadedFile() file: UploadedFileMetadata,
    @Body() dto: CreateDocumentDto,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (!file.storageUrl) {
      throw new BadRequestException('Upload to Azure failed (no storage URL)');
    }

    const payload: CreateDocumentDto = {
      ...dto,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      path: file.storageUrl,
    };

    return this.documentService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDocumentDto,
  ): Promise<Document> {
    return this.documentService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Document> {
    return this.documentService.delete(id);
  }
}
