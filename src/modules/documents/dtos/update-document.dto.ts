// External
import { PartialType } from '@nestjs/mapped-types';

// Internal
import { CreateDocumentDto } from './create-document.dto';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {}
