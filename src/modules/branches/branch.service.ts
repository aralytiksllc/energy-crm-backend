// External
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { Branch } from '@/prisma/prisma.client';
import { CreateBranchCommand } from './commands/create-branch.command';
import { CreateBranchDto } from './dtos/create-branch.dto';
import { DeleteBranchCommand } from './commands/delete-branch.command';
import { FindManyBranchsDto } from './dtos/find-many-branchs.dto';
import { FindManyBranchsQuery } from './queries/find-many-branchs.query';
import { FindOneBranchQuery } from './queries/find-one-branch.query';
import { UpdateBranchCommand } from './commands/update-branch.command';
import { UpdateBranchDto } from './dtos/update-branch.dto';

@Injectable()
export class BranchService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(
    customerId: number,
    dto: FindManyBranchsDto,
  ): Promise<Paged<Branch>> {
    const query = new FindManyBranchsQuery(customerId, dto);
    return this.queryBus.execute(query);
  }

  async findOne(customerId: number, id: number): Promise<Branch> {
    const query = new FindOneBranchQuery(customerId, id);
    return this.queryBus.execute(query);
  }

  async create(customerId: number, dto: CreateBranchDto): Promise<Branch> {
    const command = new CreateBranchCommand(customerId, dto);
    return this.commandBus.execute(command);
  }

  async update(
    customerId: number,
    id: number,
    dto: UpdateBranchDto,
  ): Promise<Branch> {
    const command = new UpdateBranchCommand(customerId, id, dto);
    return this.commandBus.execute(command);
  }

  async delete(customerId: number, id: number): Promise<Branch> {
    const command = new DeleteBranchCommand(customerId, id);
    return this.commandBus.execute(command);
  }
}
