import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FindManyVendorsHandler } from './queries/find-many-vendors.handler';
import { FindOneVendorHandler } from './queries/find-one-vendor.handler';
import { CreateVendorHandler } from './commands/create-vendor.handler';
import { UpdateVendorHandler } from './commands/update-vendor.handler';
import { DeleteVendorHandler } from './commands/delete-vendor.handler';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';

@Module({
  imports: [CqrsModule],
  controllers: [VendorsController],
  providers: [
    FindManyVendorsHandler,
    FindOneVendorHandler,
    CreateVendorHandler,
    UpdateVendorHandler,
    DeleteVendorHandler,
    VendorsService,
  ],
})
export class VendorsModule {}
