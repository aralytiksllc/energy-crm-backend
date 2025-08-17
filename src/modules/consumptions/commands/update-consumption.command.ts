// External

// Internal
import { UpdateCommand } from '@/common/cqrs/commands/update.command';
import { UpdateConsumptionDto } from '../dtos/update-consumption.dto';

export class UpdateConsumptionCommand extends UpdateCommand<UpdateConsumptionDto> {}
