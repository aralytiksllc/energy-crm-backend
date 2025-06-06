import { Vendor } from '../entities/vendor.entity';

export class VendorDeletedEvent {
  constructor(public readonly vendor: Vendor) {}
}
