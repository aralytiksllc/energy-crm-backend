import { Controller, Get, Query } from '@nestjs/common';
import { Paged } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { History } from '@/entities/history.entity';
import { HistoriesService } from './histories.service';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @Get()
  findMany(
    @Query() queryParams: QueryParams<History>,
  ): Promise<Paged<History>> {
    return this.historiesService.findMany(queryParams);
  }
}
