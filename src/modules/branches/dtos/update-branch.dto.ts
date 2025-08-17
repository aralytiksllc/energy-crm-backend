// External
import { PartialType } from '@nestjs/mapped-types';

// Internal
import { CreateBranchDto } from './create-branch.dto';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {}
