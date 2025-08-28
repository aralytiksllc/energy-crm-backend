// External

// Internal
import { UpdateCommand } from '@/common/cqrs/commands/update.command';
import { UpdateMeteringPointDto } from '../dtos/update-metering-point.dto';

export class UpdateMeteringPointCommand extends UpdateCommand<UpdateMeteringPointDto> {}
