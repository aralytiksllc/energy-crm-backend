// External dependencies
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Internal dependencies
import { PrismaService } from '@/common/prisma/prisma.service';
import { FindManyHistoriesHandler } from './queries/find-many-histories.handler';
import { CreateHistoryHandler } from './commands/create-history.handler';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
  imports: [CqrsModule],
  controllers: [HistoryController],
  providers: [
    PrismaService,

    // Query Handlers
    FindManyHistoriesHandler,

    // Command Handlers
    CreateHistoryHandler,

    // Others
    HistoryService,
  ],
})
export class HistoriesModule {}
