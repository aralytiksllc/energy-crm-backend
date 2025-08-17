// External

// Internal
import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { CreateContractDto } from '../dtos/create-contract.dto';

export class CreateContractCommand extends CreateCommand<CreateContractDto> {}
