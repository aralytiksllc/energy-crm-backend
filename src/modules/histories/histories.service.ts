import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Paged } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { History } from '@/entities/history.entity';
import { CreateHistoryDto } from './dtos/create-history.dto';
import { FindManyHistoriesQuery } from './queries/find-many-histories.query';
import { CreateHistoryCommand } from './commands/create-history.command';

@Injectable()
export class HistoriesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  public findMany(queryParams: QueryParams<History>): Promise<Paged<History>> {
    return this.queryBus.execute(new FindManyHistoriesQuery(queryParams));
  }

  public create(dto: CreateHistoryDto): Promise<History> {
    return this.commandBus.execute(new CreateHistoryCommand(dto));
  }
}
