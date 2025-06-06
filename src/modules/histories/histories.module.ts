import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { History } from '@/entities/history.entity';
import { FindManyHistoriesHandler } from './queries/find-many-histories.handler';
import { CreateHistoryHandler } from './commands/create-history.handler';
import { HistoriesController } from './histories.controller';
import { HistoriesRepository } from './histories.repository';
import { HistoriesService } from './histories.service';

@Module({
  imports: [TypeOrmModule.forFeature([History]), CqrsModule],
  controllers: [HistoriesController],
  providers: [
    // Query Handlers
    FindManyHistoriesHandler,

    // Command Handlers
    CreateHistoryHandler,

    // Others
    HistoriesRepository,
    HistoriesService,
  ],
})
export class HistoriesModule {}
