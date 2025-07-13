// External dependencies
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { History } from '@prisma/client';

// Internal dependencies
import { Paged } from '@/common/paged/paged.impl';
import { QueryParamsDto } from '@/common/query/dtos/query-params.dto';
import { CreateHistoryDto } from './dtos/create-history.dto';
import { FindManyHistoriesQuery } from './queries/find-many-histories.query';
import { CreateHistoryCommand } from './commands/create-history.command';

@Injectable()
export class HistoryService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public findMany(dto: QueryParamsDto): Promise<Paged<History>> {
    const query = new FindManyHistoriesQuery(dto);
    return this.queryBus.execute(query);
  }

  public create(dto: CreateHistoryDto): Promise<History> {
    const command = new CreateHistoryCommand(dto);
    return this.commandBus.execute(command);
  }
}
