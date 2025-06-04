import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Paged } from '@/common/paged';
import { Vendor } from '@/models/vendor.model';
import { FindManyVendorsQuery } from './find-many-vendors.query';

@QueryHandler(FindManyVendorsQuery)
export class FindManyVendorsHandler
  implements IQueryHandler<FindManyVendorsQuery>
{
  constructor(
    @InjectModel(Vendor)
    private readonly vendorModel: typeof Vendor,
  ) {}

  async execute(query: FindManyVendorsQuery): Promise<Paged<Vendor>> {
    const findOptions = query.toFindOptions();

    const result = await this.vendorModel.findAndCountAll(findOptions);

    return new Paged(result.rows, result.count, query.current, query.pageSize);
  }
}
