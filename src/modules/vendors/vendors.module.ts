import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';
import { Vendor } from '@/models/vendor.model';
import { FindManyVendorsHandler } from './queries/find-many-vendors.handler';
import { FindOneVendorHandler } from './queries/find-one-vendor.handler';
import { CreateVendorHandler } from './commands/create-vendor.handler';
import { UpdateVendorHandler } from './commands/update-vendor.handler';
import { DeleteVendorHandler } from './commands/delete-vendor.handler';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';

@Module({
  imports: [SequelizeModule.forFeature([Vendor]), CqrsModule],
  controllers: [VendorsController],
  providers: [
    // Query Handlers
    FindManyVendorsHandler,
    FindOneVendorHandler,

    // Command Handlers
    CreateVendorHandler,
    UpdateVendorHandler,
    DeleteVendorHandler,

    // Others
    VendorsService,
  ],
})
export class VendorsModule {}
