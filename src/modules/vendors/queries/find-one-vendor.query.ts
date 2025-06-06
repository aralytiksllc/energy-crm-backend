import { FindOneQuery } from '@/common/cqrs/queries/find-one.query';
import { Vendor } from '../entities/vendor.entity';

export class FindOneVendorQuery extends FindOneQuery<Vendor> {}
