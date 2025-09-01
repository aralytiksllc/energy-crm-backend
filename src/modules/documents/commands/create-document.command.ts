// External

// Internal
import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { CreateDocumentDto } from '../dtos/create-document.dto';

export class CreateDocumentCommand extends CreateCommand<CreateDocumentDto> {}
