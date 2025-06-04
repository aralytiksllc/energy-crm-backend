import { Vendor } from '@/models/vendor.model';

export class VendorUpdatedEvent {
  constructor(public readonly vendor: Vendor) {}
}
