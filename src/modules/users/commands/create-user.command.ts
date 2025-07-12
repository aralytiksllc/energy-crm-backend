// External dependencies

// Internal dependencies
import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { CreateUserDto } from '../dtos/create-user.dto';

export class CreateUserCommand extends CreateCommand<CreateUserDto> {}
