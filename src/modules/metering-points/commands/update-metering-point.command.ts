// External

// Internal
import { UpdateMeteringPointDto } from '../dtos/update-metering-point.dto';

export class UpdateMeteringPointCommand {
  constructor(
    public readonly branchId: number,
    public readonly id: number,
    public readonly dto: UpdateMeteringPointDto,
  ) {}
}
