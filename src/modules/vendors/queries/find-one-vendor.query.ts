import { FindOneQuery } from '@/common/cqrs/queries/find-one.query';
import { Vendor } from '@/models/vendor.model';

export class FindOneVendorQuery extends FindOneQuery<Vendor> {}
