// External
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

// Internal
import { Paged } from '@/common/paged/paged.impl';
import type { Contract } from '@/prisma/prisma.client';
import { CreateContractCommand } from './commands/create-contract.command';
import { CreateContractDto } from './dtos/create-contract.dto';
import { DeleteContractCommand } from './commands/delete-contract.command';
import { FindManyContractsDto } from './dtos/find-many-contracts.dto';
import { FindManyContractsQuery } from './queries/find-many-contracts.query';
import { FindOneContractQuery } from './queries/find-one-contract.query';
import { UpdateContractCommand } from './commands/update-contract.command';
import { UpdateContractDto } from './dtos/update-contract.dto';
import { GenerateContractPdfCommand } from './commands/generate-contract-pdf.command';

@Injectable()
export class ContractService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findMany(dto: FindManyContractsDto): Promise<Paged<Contract>> {
    const query = new FindManyContractsQuery(dto);
    return this.queryBus.execute(query);
  }

  async findOne(id: number): Promise<Contract> {
    const query = new FindOneContractQuery(id);
    return this.queryBus.execute(query);
  }

  async create(dto: CreateContractDto): Promise<Contract> {
    const command = new CreateContractCommand(dto);
    return this.commandBus.execute(command);
  }

  async update(id: number, dto: UpdateContractDto): Promise<Contract> {
    const command = new UpdateContractCommand(id, dto);
    return this.commandBus.execute(command);
  }

  async delete(id: number): Promise<Contract> {
    const command = new DeleteContractCommand(id);
    return this.commandBus.execute(command);
  }

  async generatePdf(id: number): Promise<Contract> {
    const command = new GenerateContractPdfCommand(id);
    return this.commandBus.execute(command);
  }
}
