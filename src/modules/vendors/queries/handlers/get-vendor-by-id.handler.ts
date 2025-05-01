import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Vendor } from '../../entities/vendor.entity';
import { GetVendorByIdQuery } from '../impl/get-vendor-by-id.query';

@QueryHandler(GetVendorByIdQuery)
export class GetVendorByIdHandler implements IQueryHandler<GetVendorByIdQuery> {
  constructor(
    @InjectRepository(Vendor) protected readonly repository: Repository<Vendor>,
  ) {}

  async execute(query: GetVendorByIdQuery): Promise<Vendor> {
    const where = { id: query.id } as FindOptionsWhere<Vendor>;
    return await this.repository.findOneByOrFail(where);
  }
}
