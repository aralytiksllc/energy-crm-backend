// External dependencies
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

// Internal dependencies
import { BaseRepository } from '@/common/cqrs/base.repository';
import { Customer } from '@/modules/sales/entities/customer.entity';

@Injectable()
export class SalesRepository extends BaseRepository<Customer> {
  constructor(dataSource: DataSource) {
    super(Customer, dataSource);
  }
}
