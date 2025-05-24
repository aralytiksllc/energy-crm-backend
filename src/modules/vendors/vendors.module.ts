import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GetVendorsHandler } from './handlers/get-vendors.handler';
import { GetVendorByIdHandler } from './handlers/get-vendor-by-id.handler';
import { CreateVendorHandler } from './handlers/create-vendor.handler';
import { UpdateVendorHandler } from './handlers/update-vendor.handler';
import { DeleteVendorHandler } from './handlers/delete-vendor.handler';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';

@Module({
  imports: [CqrsModule],
  controllers: [VendorsController],
  providers: [
    VendorsService,
    GetVendorsHandler,
    GetVendorByIdHandler,
    CreateVendorHandler,
    UpdateVendorHandler,
    DeleteVendorHandler,
  ],
})
export class VendorsModule {}
