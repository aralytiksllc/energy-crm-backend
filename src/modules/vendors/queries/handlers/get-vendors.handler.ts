import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paging } from '@/common/paging';
import { Vendor } from '../../entities/vendor.entity';
import { GetVendorsQuery } from '../impl/get-vendors.query';

@QueryHandler(GetVendorsQuery)
export class GetVendorsHandler implements IQueryHandler<GetVendorsQuery> {
  constructor(
    @InjectRepository(Vendor) protected readonly repository: Repository<Vendor>,
  ) {}

  async execute(query: GetVendorsQuery): Promise<Paging<Vendor>> {
    const findOptions = query.toFindOptions();

    const [items, total] = await this.repository.findAndCount(findOptions);

    return new Paging(items, total);
  }
}
