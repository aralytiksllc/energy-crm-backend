import { FindManyQuery } from '@/common/cqrs/queries/find-many.query';
import { Vendor } from '../entities/vendor.entity';

export class FindManyVendorsQuery extends FindManyQuery<Vendor> {}
