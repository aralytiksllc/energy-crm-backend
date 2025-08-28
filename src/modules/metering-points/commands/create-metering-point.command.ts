// External

// Internal
import { CreateMeteringPointDto } from '../dtos/create-metering-point.dto';

export class CreateMeteringPointCommand {
  constructor(
    public readonly branchId: number,
    public readonly dto: CreateMeteringPointDto,
  ) {}
}
