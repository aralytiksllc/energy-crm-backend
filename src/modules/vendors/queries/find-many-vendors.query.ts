import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { Vendor } from '@/models/vendor.model';

export class FindManyVendorsQuery extends FindManyQuery<Vendor> {}
