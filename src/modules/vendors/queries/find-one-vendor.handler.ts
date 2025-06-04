import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Vendor } from '@/models/vendor.model';
import { FindOneVendorQuery } from './find-one-vendor.query';

@QueryHandler(FindOneVendorQuery)
export class FindOneVendorHandler implements IQueryHandler<FindOneVendorQuery> {
  constructor(
    @InjectModel(Vendor)
    protected readonly vendorModel: typeof Vendor,
  ) {}

  async execute(query: FindOneVendorQuery): Promise<Nullable<Vendor>> {
    return this.vendorModel.findByPk(query.id, query.options);
  }
}
