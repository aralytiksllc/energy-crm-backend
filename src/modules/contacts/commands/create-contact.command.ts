// External

// Internal
import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { CreateContactDto } from '../dtos/create-contact.dto';

export class CreateContactCommand extends CreateCommand<CreateContactDto> {}
