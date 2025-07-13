// External dependencies

// Internal dependencies
import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { UpdatePasswordDto } from '../dtos/update-password.dto';

export class UpdatePasswordCommand extends CreateCommand<UpdatePasswordDto> {}
