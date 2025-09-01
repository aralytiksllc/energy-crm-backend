// External

// Internal
import { CreateConsumptionDto } from '../dtos/create-consumption.dto';
import { CreateConsumptionFileDto } from '../dtos/create-consumption-file.dto';

export class CreateConsumptionCommand {
  constructor(
    public readonly file: Express.Multer.File,
    public readonly dto: CreateConsumptionFileDto,
    public readonly rows: CreateConsumptionDto[],
  ) {}
}
