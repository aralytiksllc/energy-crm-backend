// External
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { MeteringPoint } from '@/prisma/prisma.client';
import { CreateMeteringPointCommand } from './commands/create-metering-point.command';
import { CreateMeteringPointDto } from './dtos/create-metering-point.dto';
import { DeleteMeteringPointCommand } from './commands/delete-metering-point.command';
import { FindManyMeteringPointsDto } from './dtos/find-many-metering-points.dto';
import { FindManyMeteringPointsQuery } from './queries/find-many-metering-points.query';
import { FindOneMeteringPointQuery } from './queries/find-one-metering-point.query';
import { UpdateMeteringPointCommand } from './commands/update-metering-point.command';
import { UpdateMeteringPointDto } from './dtos/update-metering-point.dto';

@Injectable()
export class MeteringPointService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(
    branchId: number,
    dto: FindManyMeteringPointsDto,
  ): Promise<Paged<MeteringPoint>> {
    const query = new FindManyMeteringPointsQuery(branchId, dto);
    return this.queryBus.execute(query);
  }

  async findOne(branchId: number, id: number): Promise<MeteringPoint> {
    const query = new FindOneMeteringPointQuery(branchId, id);
    return this.queryBus.execute(query);
  }

  async create(branchId: number, dto: CreateMeteringPointDto): Promise<MeteringPoint> {
    const command = new CreateMeteringPointCommand(branchId, dto);
    return this.commandBus.execute(command);
  }

  async update(
    branchId: number,
    id: number,
    dto: UpdateMeteringPointDto,
  ): Promise<MeteringPoint> {
    const command = new UpdateMeteringPointCommand(branchId, id, dto);
    return this.commandBus.execute(command);
  }

  async delete(branchId: number, id: number): Promise<MeteringPoint> {
    const command = new DeleteMeteringPointCommand(branchId, id);
    return this.commandBus.execute(command);
  }
}
