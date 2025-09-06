// External
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

// Internal
import { CreateConsumptionHandler } from './commands/create-consumption.handler';
import { DeleteConsumptionHandler } from './commands/delete-consumption.handler';
import { FindManyConsumptionsPipe } from './pipes/find-many-consumptions.pipe';
import { FindManyConsumptionsHandler } from './queries/find-many-consumptions.handler';
import { FindOneConsumptionHandler } from './queries/find-one-consumption.handler';
import { UpdateConsumptionHandler } from './commands/update-consumption.handler';
import { ConsumptionController } from './consumption.controller';
import { ConsumptionService } from './consumption.service';

@Module({
  imports: [CqrsModule],
  controllers: [ConsumptionController],
  providers: [
    FindManyConsumptionsPipe,
    FindManyConsumptionsHandler,
    FindOneConsumptionHandler,
    CreateConsumptionHandler,
    UpdateConsumptionHandler,
    DeleteConsumptionHandler,
    ConsumptionService,
  ],
  exports: [ConsumptionService],
})
export class ConsumptionModule {}
