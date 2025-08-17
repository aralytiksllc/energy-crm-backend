// External

// Internal
import { UpdateCommand } from '@/common/cqrs/commands/update.command';
import { UpdateContractDto } from '../dtos/update-contract.dto';

export class UpdateContractCommand extends UpdateCommand<UpdateContractDto> {}
