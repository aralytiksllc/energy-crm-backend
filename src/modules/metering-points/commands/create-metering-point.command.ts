// External

// Internal
import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { CreateMeteringPointDto } from '../dtos/create-metering-point.dto';

export class CreateMeteringPointCommand extends CreateCommand<CreateMeteringPointDto> {}
