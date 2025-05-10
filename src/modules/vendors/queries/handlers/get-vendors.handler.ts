import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination, PaginationResult } from '@/common/pagination';
import { Vendor } from '../../entities/vendor.entity';
import { GetVendorsQuery } from '../impl/get-vendors.query';

@QueryHandler(GetVendorsQuery)
export class GetVendorsHandler implements IQueryHandler<GetVendorsQuery> {
  constructor(
    @InjectRepository(Vendor) protected readonly repository: Repository<Vendor>,
  ) {}

  async execute(query: GetVendorsQuery): Promise<PaginationResult<Vendor>> {
    const pagination = new Pagination(query);

    const findOptions = query.toFindOptions();

    const [items, total] = await this.repository.findAndCount(findOptions);

    return pagination.getResult(items, total);
  }
}
