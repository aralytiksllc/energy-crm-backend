// External

// Internal
import { UpdateBranchDto } from '../dtos/update-branch.dto';

export class UpdateBranchCommand {
  constructor(
    public readonly customerId: number,
    public readonly id: number,
    public readonly dto: UpdateBranchDto,
  ) {}
}
