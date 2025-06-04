import { Vendor } from '@/models/vendor.model';

export class VendorDeletedEvent {
  constructor(public readonly vendor: Vendor) {}
}
