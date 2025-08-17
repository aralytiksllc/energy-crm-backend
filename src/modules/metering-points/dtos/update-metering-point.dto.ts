// External
import { PartialType } from '@nestjs/mapped-types';

// Internal
import { CreateMeteringPointDto } from './create-metering-point.dto';

export class UpdateMeteringPointDto extends PartialType(CreateMeteringPointDto) {}
