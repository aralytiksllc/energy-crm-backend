// External

// Internal
import { UpdateCommand } from '@/common/cqrs/commands/update.command';
import { UpdateBranchDto } from '../dtos/update-branch.dto';

export class UpdateBranchCommand extends UpdateCommand<UpdateBranchDto> {}
