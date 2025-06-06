import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Vendor } from '../entities/vendor.entity';
import { FindOneVendorQuery } from './find-one-vendor.query';

@QueryHandler(FindOneVendorQuery)
export class FindOneVendorHandler implements IQueryHandler<FindOneVendorQuery> {
  constructor(
    @InjectRepository(Vendor)
    protected readonly vendorRepository: Repository<Vendor>,
  ) {}

  async execute(query: FindOneVendorQuery): Promise<Nullable<Vendor>> {
    const options: FindOneOptions<Vendor> = {
      where: { id: query.id },
      ...query.options,
    };

    return this.vendorRepository.findOne(options);
  }
}
