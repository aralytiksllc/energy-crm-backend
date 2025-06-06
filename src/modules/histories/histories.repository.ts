import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@/common/cqrs/base.repository';
import { History } from '@/entities/history.entity';

@Injectable()
export class HistoriesRepository extends BaseRepository<History> {
  constructor(dataSource: DataSource) {
    super(History, dataSource);
  }
}
