// External dependencies
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmModule } from '@mikro-orm/nestjs';

// Internal dependencies
import { History } from './entities/history.entity';
import { FindManyHistoryHandler } from './queries/find-many-histories.handler';
import { CreateHistoryHandler } from './commands/create-history.handler';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [MikroOrmModule.forFeature([History]), CqrsModule],
  controllers: [HistoryController],
  providers: [
    // Query Handlers
    FindManyHistoryHandler,

    // Command Handlers
    CreateHistoryHandler,

    // Others
    HistoryService,
  ],
})
export class HistoryModule {}
