import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CqrsModule } from '@nestjs/cqrs';
import { GetVendorsHandler } from './queries/handlers/get-vendors.handler';
import { GetVendorByIdHandler } from './queries/handlers/get-vendor-by-id.handler';
import { CreateVendorHandler } from './commands/handlers/create-vendor.handler';
import { UpdateVendorHandler } from './commands/handlers/update-vendor.handler';
import { DeleteVendorHandler } from './commands/handlers/delete-vendor.handler';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import { Vendor } from './models/vendor.model';

@Module({
  imports: [SequelizeModule.forFeature([Vendor]), CqrsModule],
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
