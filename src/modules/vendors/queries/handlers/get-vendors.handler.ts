import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination, PaginationResult } from "@/common/pagination"
import { Vendor } from '../../entities/vendor.entity';
import { GetVendorsQuery } from '../impl/get-vendors.query';

@QueryHandler(GetVendorsQuery)
export class GetVendorsHandler implements IQueryHandler<GetVendorsQuery> {
  constructor(
    @InjectRepository(Vendor) protected readonly repository: Repository<Vendor>,
  ) { }

  async execute(query: GetVendorsQuery): Promise<Promise<PaginationResult<Vendor>>> {
    const pagination = new Pagination({ page: query.page, limit: query.limit });

    const [items, total] = await this.repository.findAndCount(query.toFindOptions());

    return pagination.getResult(items, total);
  }
}
