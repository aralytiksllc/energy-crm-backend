// External
import { PartialType } from '@nestjs/mapped-types';

// Internal
import { CreateContractDto } from './create-contract.dto';

export class UpdateContractDto extends PartialType(CreateContractDto) {}
