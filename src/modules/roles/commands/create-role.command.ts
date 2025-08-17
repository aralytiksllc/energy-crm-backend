// External

// Internal
import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { CreateRoleDto } from '../dtos/create-role.dto';

export class CreateRoleCommand extends CreateCommand<CreateRoleDto> {}
