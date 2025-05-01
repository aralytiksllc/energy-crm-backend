import { UpdateVendorDto } from '../../dto/update-vendor.dto';

export class UpdateVendorCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateVendorDto,
  ) {}
}
