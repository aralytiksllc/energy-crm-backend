import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { GetProductsHandler } from './queries/handlers/get-products.handler';
import { GetProductByIdHandler } from './queries/handlers/get-product-by-id.handler';
import { CreateProductHandler } from './commands/handlers/create-product.handler';
import { UpdateProductHandler } from './commands/handlers/update-product.handler';
import { DeleteProductHandler } from './commands/handlers/delete-product.handler';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { ProductPhoto } from './entities/product-photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductPhoto]), CqrsModule],
  controllers: [ProductsController],
  providers: [
    GetProductsHandler,
    GetProductByIdHandler,
    CreateProductHandler,
    UpdateProductHandler,
    DeleteProductHandler,
  ],
})
export class ProductsModule {}
