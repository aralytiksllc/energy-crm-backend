import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateSaleHandler } from './commands/handlers/create-sale.handler';
import { UpdateSaleHandler } from './commands/handlers/update-sale.handler';
import { DeleteSaleHandler } from './commands/handlers/delete-sale.handler';
import { GetSalesHandler } from './queries/handlers/get-sales.handler';
import { GetSaleByIdHandler } from './queries/handlers/get-sale-by-id.handler';
import { SalesController } from './sales.controller';
import { Sale } from './entities/sale.entity';
import { SaleItem } from './entities/sale-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, SaleItem]), CqrsModule],
  controllers: [SalesController],
  providers: [
    // CommandHandlers
    CreateSaleHandler,
    UpdateSaleHandler,
    DeleteSaleHandler,

    // QueryHandlers
    GetSalesHandler,
    GetSaleByIdHandler,
  ],
})
export class SalesModule { }
