// External
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

// Internal
import { CreateConsumptionHandler } from './commands/create-consumption.handler';
import { DeleteConsumptionHandler } from './commands/delete-consumption.handler';
import { FindManyConsumptionsPipe } from './pipes/find-many-consumptions.pipe';
import { FindManyConsumptionsHandler } from './queries/find-many-consumptions.handler';
import { FindOneConsumptionHandler } from './queries/find-one-consumption.handler';
import { PrismaModule } from '@/prisma/prisma.module';
import { UpdateConsumptionHandler } from './commands/update-consumption.handler';
import { ConsumptionController } from './consumption.controller';
import { ConsumptionService } from './consumption.service';
import { ConsumptionSeed } from './consumption.seed';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [ConsumptionController],
  providers: [
    FindManyConsumptionsPipe,
    FindManyConsumptionsHandler,
    FindOneConsumptionHandler,
    CreateConsumptionHandler,
    UpdateConsumptionHandler,
    DeleteConsumptionHandler,
    ConsumptionService,
    ConsumptionSeed,
  ],
  exports: [ConsumptionService],
})
export class ConsumptionModule {}
