// External
import { PartialType } from '@nestjs/mapped-types';

// Internal
import { CreateConsumptionDto } from './create-consumption.dto';

export class UpdateConsumptionDto extends PartialType(CreateConsumptionDto) {}
