// External dependencies
import { Controller, Get, Query } from '@nestjs/common';
import { History } from '@prisma/client';

// Internal dependencies
import { QueryParamsDto } from '@/common/query/dtos/query-params.dto';
import { Paged } from '@/common/paged/paged.impl';
import { HistoryService } from './history.service';

@Controller('histories')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get()
  findMany(@Query() dto: QueryParamsDto): Promise<Paged<History>> {
    return this.historyService.findMany(dto);
  }
}
