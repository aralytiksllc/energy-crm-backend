// External

// Internal
import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { CreateConsumptionDto } from '../dtos/create-consumption.dto';

export class CreateConsumptionCommand extends CreateCommand<CreateConsumptionDto> {}
