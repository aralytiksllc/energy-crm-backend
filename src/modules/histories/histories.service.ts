import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { History } from './entities/history.entity';
import { CreateHistoryDto } from './dtos/create-history.dto';
import { CreateHistoryCommand } from './commands/create-history.command';

@Injectable()
export class HistoriesService {
  constructor(private readonly commandBus: CommandBus) {}

  async createHistory(dto: CreateHistoryDto): Promise<History> {
    return await this.commandBus.execute(new CreateHistoryCommand(dto));
  }
}
