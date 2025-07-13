// External dependencies

// Internal dependencies
import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { LoginDto } from '../dtos/login.dto';

export class LoginCommand extends CreateCommand<LoginDto> {}
