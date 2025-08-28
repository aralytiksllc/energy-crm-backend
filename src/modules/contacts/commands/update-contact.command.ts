// External

// Internal
import { UpdateCommand } from '@/common/cqrs/commands/update.command';
import { UpdateContactDto } from '../dtos/update-contact.dto';

export class UpdateContactCommand extends UpdateCommand<UpdateContactDto> {}
