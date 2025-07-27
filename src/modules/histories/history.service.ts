// External dependencies
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

// Internal dependencies
import { Paged } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { History } from './entities/history.entity';
import { CreateHistoryDto } from './dtos/create-history.dto';
import { FindManyHistoryQuery } from './queries/find-many-histories.query';
import { CreateHistoryCommand } from './commands/create-history.command';

@Injectable()
export class HistoryService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public findMany(queryParams: QueryParams<History>): Promise<Paged<History>> {
    const query = new FindManyHistoryQuery(queryParams);
    return this.queryBus.execute(query);
  }

  public create(dto: CreateHistoryDto): Promise<History> {
    const command = new CreateHistoryCommand(dto);
    return this.commandBus.execute(command);
  }
}
