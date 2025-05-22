import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateSaleHandler } from './commands/handlers/create-sale.handler';
import { UpdateSaleHandler } from './commands/handlers/update-sale.handler';
import { DeleteSaleHandler } from './commands/handlers/delete-sale.handler';
import { GetSalesHandler } from './queries/handlers/get-sales.handler';
import { GetSaleByIdHandler } from './queries/handlers/get-sale-by-id.handler';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { Sale } from './models/sale.model';
import { SaleItem } from './models/sale-item.model';

@Module({
  imports: [SequelizeModule.forFeature([Sale, SaleItem]), CqrsModule],
  controllers: [SalesController],
  providers: [
    SalesService,
    // CommandHandlers
    CreateSaleHandler,
    UpdateSaleHandler,
    DeleteSaleHandler,

    // QueryHandlers
    GetSalesHandler,
    GetSaleByIdHandler,
  ],
})
export class SalesModule {}
