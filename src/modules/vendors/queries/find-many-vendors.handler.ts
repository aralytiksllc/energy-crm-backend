import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paged } from '@/common/paged';
import { Vendor } from '../entities/vendor.entity';
import { FindManyVendorsQuery } from './find-many-vendors.query';

@QueryHandler(FindManyVendorsQuery)
export class FindManyVendorsHandler
  implements IQueryHandler<FindManyVendorsQuery>
{
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  async execute(query: FindManyVendorsQuery): Promise<Paged<Vendor>> {
    const options = query.toFindManyOptions();

    const [rows, count] = await this.vendorRepository.findAndCount(options);

    return new Paged(rows, count, query.current, query.pageSize);
  }
}
