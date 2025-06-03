import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Paging } from '@/common/paged';
import { QueryParams } from '@/common/query/query-params';
import { Sale } from '@/models/sale.model';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { GetSalesQuery } from './queries/get-sales.query';
import { GetSaleByIdQuery } from './queries/get-sale-by-id.query';
import { DeleteSaleCommand } from './commands/delete-sale.command';
import { CreateSaleCommand } from './commands/create-sale.command';
import { UpdateSaleCommand } from './commands/update-sale.command';

@Injectable()
export class SalesService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async findAll(queryParams: QueryParams<Sale>): Promise<Paging<Sale>> {
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
