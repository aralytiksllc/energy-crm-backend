import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../../entities/vendor.entity';
import { GetVendorsQuery } from '../impl/get-vendors.query';

@QueryHandler(GetVendorsQuery)
export class GetVendorsHandler implements IQueryHandler<GetVendorsQuery> {
  constructor(
    @InjectRepository(Vendor) protected readonly repository: Repository<Vendor>,
  ) { }

  async execute(query: GetVendorsQuery): Promise<Vendor[]> {
    return await this.repository.find(query.toFindOptions());
  }
}
