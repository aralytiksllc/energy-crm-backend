import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Vendor } from '@/models/vendor.model';
import { GetVendorByIdQuery } from '../impl/get-vendor-by-id.query';

@QueryHandler(GetVendorByIdQuery)
export class GetVendorByIdHandler implements IQueryHandler<GetVendorByIdQuery> {
  constructor(
    @InjectModel(Vendor)
    protected readonly vendorModel: typeof Vendor,
  ) {}

  async execute(query: GetVendorByIdQuery): Promise<Vendor> {
    const vendor = await this.vendorModel.findByPk(query.id);

    if (!vendor) throw new Error(`Vendor with ID ${query.id} not found.`);

    return vendor;
  }
}
