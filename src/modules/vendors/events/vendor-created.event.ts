import { Vendor } from '@/models/vendor.model';

export class VendorCreatedEvent {
  constructor(public readonly vendor: Vendor) {}
}
