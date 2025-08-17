// External

// Internal
import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { CreateBranchDto } from '../dtos/create-branch.dto';

export class CreateBranchCommand extends CreateCommand<CreateBranchDto> {}
