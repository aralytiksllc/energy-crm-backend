// External dependencies
import { Controller, Get, Query } from '@nestjs/common';

// Internal dependencies
import { QueryParams } from '@/common/query/query-params';
import { Paged } from '@/common/paged';
import { History } from './entities/history.entity';
import { HistoryService } from './history.service';

@Controller('histories')
export class HistoryController {
  constructor(private readonly historiesService: HistoryService) {}

  @Get()
  findMany(
    @Query() queryParams: QueryParams<History>,
  ): Promise<Paged<History>> {
    return this.historiesService.findMany(queryParams);
  }
}
