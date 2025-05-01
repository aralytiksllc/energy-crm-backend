import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { GetVendorsHandler } from './queries/handlers/get-vendors.handler';
import { GetVendorByIdHandler } from './queries/handlers/get-vendor-by-id.handler';
import { CreateVendorHandler } from './commands/handlers/create-vendor.handler';
import { UpdateVendorHandler } from './commands/handlers/update-vendor.handler';
import { DeleteVendorHandler } from './commands/handlers/delete-vendor.handler';
import { VendorController } from './vendor.controller';
import { Vendor } from './entities/vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vendor]), CqrsModule],
  controllers: [VendorController],
  providers: [
    GetVendorsHandler,
    GetVendorByIdHandler,
    CreateVendorHandler,
    UpdateVendorHandler,
    DeleteVendorHandler,
  ],
})
export class VendorModule {}
