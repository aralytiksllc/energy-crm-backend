// External dependencies
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

// Internal dependencies
import { BaseRepository } from '@/common/cqrs/base.repository';
import { Customer } from '@/modules/products/entities/customer.entity';

@Injectable()
export class ProductsRepository extends BaseRepository<Customer> {
  constructor(dataSource: DataSource) {
    super(Customer, dataSource);
  }
}
