import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetProductsHandler } from './handlers/get-products.handler';
import { GetProductByIdHandler } from './handlers/get-product-by-id.handler';
import { CreateProductHandler } from './handlers/create-product.handler';
import { UpdateProductHandler } from './handlers/update-product.handler';
import { DeleteProductHandler } from './handlers/delete-product.handler';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [CqrsModule],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    GetProductsHandler,
    GetProductByIdHandler,
    CreateProductHandler,
    UpdateProductHandler,
    DeleteProductHandler,
  ],
})
export class ProductsModule {}
