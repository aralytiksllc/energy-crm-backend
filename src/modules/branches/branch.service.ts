// External
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

// Internal
import { Paginate } from '@/common/paginate';
import { type Branch } from '@/prisma/prisma.client';
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

  async findMany(dto: FindManyBranchsDto): Promise<Paginate<Branch>> {
    const query = new FindManyBranchsQuery(dto);
    return this.queryBus.execute(query);
  }

  async findOne(id: number): Promise<Branch> {
    const query = new FindOneBranchQuery(id);
    return this.queryBus.execute(query);
  }

  async create(dto: CreateBranchDto): Promise<Branch> {
    const command = new CreateBranchCommand(dto);
    return this.commandBus.execute(command);
  }

  async update(id: number, dto: UpdateBranchDto): Promise<Branch> {
    const command = new UpdateBranchCommand(id, dto);
    return this.commandBus.execute(command);
  }

  async delete(id: number): Promise<Branch> {
    const command = new DeleteBranchCommand(id);
    return this.commandBus.execute(command);
  }
}
