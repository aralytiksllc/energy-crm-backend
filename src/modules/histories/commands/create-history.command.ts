// External dependencies

// Internal dependencies
import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { CreateHistoryDto } from '../dtos/create-history.dto';

export class CreateHistoryCommand extends CreateCommand<CreateHistoryDto> {}
