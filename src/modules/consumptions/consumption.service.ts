// External
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { Consumption } from '@/prisma/prisma.client';
import { CreateConsumptionCommand } from './commands/create-consumption.command';
import { CreateConsumptionDto } from './dtos/create-consumption.dto';
import { DeleteConsumptionCommand } from './commands/delete-consumption.command';
import { FindManyConsumptionsDto } from './dtos/find-many-consumptions.dto';
import { FindManyConsumptionsQuery } from './queries/find-many-consumptions.query';
import { FindOneConsumptionQuery } from './queries/find-one-consumption.query';
import { UpdateConsumptionCommand } from './commands/update-consumption.command';
import { UpdateConsumptionDto } from './dtos/update-consumption.dto';

@Injectable()
export class ConsumptionService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(dto: FindManyConsumptionsDto): Promise<Paged<Consumption>> {
    const query = new FindManyConsumptionsQuery(dto);
    return this.queryBus.execute(query);
  }

  async findOne(id: number): Promise<Consumption> {
    const query = new FindOneConsumptionQuery(id);
    return this.queryBus.execute(query);
  }

  async create(dto: CreateConsumptionDto): Promise<Consumption> {
    const command = new CreateConsumptionCommand(dto);
    return this.commandBus.execute(command);
  }

  async update(id: number, dto: UpdateConsumptionDto): Promise<Consumption> {
    const command = new UpdateConsumptionCommand(id, dto);
    return this.commandBus.execute(command);
  }

  async delete(id: number): Promise<Consumption> {
    const command = new DeleteConsumptionCommand(id);
    return this.commandBus.execute(command);
  }
}
