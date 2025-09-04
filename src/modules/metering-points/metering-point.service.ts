// External
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { type MeteringPoint } from '@/common/prisma/prisma.client';
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
    dto: FindManyMeteringPointsDto,
  ): Promise<Paginate<MeteringPoint>> {
    const query = new FindManyMeteringPointsQuery(dto);
    return this.queryBus.execute(query);
  }

  async findOne(id: number): Promise<MeteringPoint> {
    const query = new FindOneMeteringPointQuery(id);
    return this.queryBus.execute(query);
  }

  async create(dto: CreateMeteringPointDto): Promise<MeteringPoint> {
    const command = new CreateMeteringPointCommand(dto);
    return this.commandBus.execute(command);
  }

  async update(
    id: number,
    dto: UpdateMeteringPointDto,
  ): Promise<MeteringPoint> {
    const command = new UpdateMeteringPointCommand(id, dto);
    return this.commandBus.execute(command);
  }

  async delete(id: number): Promise<MeteringPoint> {
    const command = new DeleteMeteringPointCommand(id);
    return this.commandBus.execute(command);
  }
}
