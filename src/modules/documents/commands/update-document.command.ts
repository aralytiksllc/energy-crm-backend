// External

// Internal
import { UpdateCommand } from '@/common/cqrs/commands/update.command';
import { UpdateDocumentDto } from '../dtos/update-document.dto';

export class UpdateDocumentCommand extends UpdateCommand<UpdateDocumentDto> {}
