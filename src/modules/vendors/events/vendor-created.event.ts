import { Vendor } from '../entities/vendor.entity';

export class VendorCreatedEvent {
  constructor(public readonly vendor: Vendor) {}
}
