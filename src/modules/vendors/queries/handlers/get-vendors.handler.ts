import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Paging } from '@/common/paging';
import { Vendor } from '../../models/vendor.model';
import { GetVendorsQuery } from '../impl/get-vendors.query';

@QueryHandler(GetVendorsQuery)
export class GetVendorsHandler implements IQueryHandler<GetVendorsQuery> {
  constructor(
    @InjectModel(Vendor)
    protected readonly vendorModel: typeof Vendor,
  ) {}

  async execute(query: GetVendorsQuery): Promise<Paging<Vendor>> {
    const sequelizeOptions = query.toSequelizeOptions();

    const { rows, count } =
      await this.vendorModel.findAndCountAll(sequelizeOptions);

    return new Paging(rows, count);
  }
}
