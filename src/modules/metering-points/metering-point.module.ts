// External
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

// Internal
import { CreateMeteringPointHandler } from './commands/create-metering-point.handler';
import { DeleteMeteringPointHandler } from './commands/delete-metering-point.handler';
import { FindManyMeteringPointsPipe } from './pipes/find-many-metering-points.pipe';
import { FindManyMeteringPointsHandler } from './queries/find-many-metering-points.handler';
import { FindOneMeteringPointHandler } from './queries/find-one-metering-point.handler';
import { PrismaModule } from '@/prisma/prisma.module';
import { UpdateMeteringPointHandler } from './commands/update-metering-point.handler';
import { MeteringPointController } from './metering-point.controller';
import { MeteringPointService } from './metering-point.service';
import { MeteringPointSeed } from './metering-point.seed';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [MeteringPointController],
  providers: [
    FindManyMeteringPointsPipe,
    FindManyMeteringPointsHandler,
    FindOneMeteringPointHandler,
    CreateMeteringPointHandler,
    UpdateMeteringPointHandler,
    DeleteMeteringPointHandler,
    MeteringPointService,
    MeteringPointSeed,
  ],
  exports: [MeteringPointService],
})
export class MeteringPointModule {}
