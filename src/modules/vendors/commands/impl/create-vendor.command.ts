import { CreateVendorDto } from '../../dto/create-vendor.dto';

export class CreateVendorCommand {
  constructor(public readonly dto: CreateVendorDto) {}
}
