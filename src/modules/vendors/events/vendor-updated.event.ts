import { Vendor } from '@/entities/vendor.entity';

export class VendorUpdatedEvent {
  constructor(public readonly vendor: Vendor) {}
}
