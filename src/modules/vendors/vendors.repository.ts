import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@/common/cqrs/base.repository';
import { Vendor } from '@/entities/vendor.entity';

@Injectable()
export class VendorsRepository extends BaseRepository<Vendor> {
  constructor(dataSource: DataSource) {
    super(Vendor, dataSource);
  }
}
