import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { BaseRepository } from '@/common/cqrs/base.repository';
import { Customer } from '@/entities/customer.entity';

@Injectable()
export class SalesRepository extends BaseRepository<Customer> {
  constructor(dataSource: DataSource) {
    super(Customer, dataSource);
  }
}
