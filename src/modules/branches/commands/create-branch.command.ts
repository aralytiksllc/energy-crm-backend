// External

// Internal
import { CreateBranchDto } from '../dtos/create-branch.dto';

export class CreateBranchCommand {
  constructor(
    public readonly customerId: number,
    public readonly dto: CreateBranchDto,
  ) {}
}
