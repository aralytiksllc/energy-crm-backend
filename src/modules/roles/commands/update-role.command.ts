// External

// Internal
import { UpdateCommand } from '@/common/cqrs/commands/update.command';
import { UpdateRoleDto } from '../dtos/update-role.dto';

export class UpdateRoleCommand extends UpdateCommand<UpdateRoleDto> {}
