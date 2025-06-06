import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { History } from './entities/history.entity';
import { CreateHistoryHandler } from './commands/create-history.handler';

@Module({
  imports: [TypeOrmModule.forFeature([History]), CqrsModule],
  providers: [CreateHistoryHandler],
})
export class HistoriesModule {}
