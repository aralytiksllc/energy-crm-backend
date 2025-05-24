import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateSaleHandler } from './handlers/create-sale.handler';
import { UpdateSaleHandler } from './handlers/update-sale.handler';
import { DeleteSaleHandler } from './handlers/delete-sale.handler';
import { GetSalesHandler } from './handlers/get-sales.handler';
import { GetSaleByIdHandler } from './handlers/get-sale-by-id.handler';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

@Module({
  imports: [CqrsModule],
  controllers: [SalesController],
  providers: [
    SalesService,
    CreateSaleHandler,
    UpdateSaleHandler,
    DeleteSaleHandler,
    GetSalesHandler,
    GetSaleByIdHandler,
  ],
})
export class SalesModule {}
