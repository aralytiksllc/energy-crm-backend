import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { Vendor } from '@/models/vendor.model';
import { CreateVendorDto } from '../dtos/create-vendor.dto';

export class CreateVendorCommand extends CreateCommand<
  CreateVendorDto,
  Vendor
> {}
