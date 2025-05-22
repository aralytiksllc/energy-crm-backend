import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PaginationResult } from '@/common/pagination/pagination.interfaces';
import { QueryParams } from '@/common/query/query-params';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { DeleteSaleCommand } from './commands/impl/delete-sale.command';
import { CreateSaleCommand } from './commands/impl/create-sale.command';
import { UpdateSaleCommand } from './commands/impl/update-sale.command';
import { GetSaleByIdQuery } from './queries/impl/get-sale-by-id.query';
import { GetSalesQuery } from './queries/impl/get-sales.query';
import { Sale } from './models/sale.model';

@Injectable()
export class SalesService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findAll(queryParams: QueryParams<Sale>): Promise<PaginationResult<Sale>> {
    return this.queryBus.execute(new GetSalesQuery(queryParams));
  }

  async findOne(id: string): Promise<Sale> {
    return this.queryBus.execute(new GetSaleByIdQuery(id));
  }

  async create(dto: CreateSaleDto): Promise<Sale> {
    return this.commandBus.execute(new CreateSaleCommand(dto));
  }

  async update(id: string, dto: UpdateSaleDto): Promise<Sale> {
    return this.commandBus.execute(new UpdateSaleCommand(id, dto));
  }

  async delete(id: string): Promise<void> {
    return this.commandBus.execute(new DeleteSaleCommand(id));
  }
} 