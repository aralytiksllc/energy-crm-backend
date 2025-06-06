import { CreateHistoryDto } from '../dtos/create-history.dto';

export class CreateHistoryCommand {
  constructor(public readonly dto: CreateHistoryDto) {}
}
