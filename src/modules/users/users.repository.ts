// External dependencies
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

// Internal dependencies
import { BaseRepository } from '@/common/cqrs/base.repository';
import { User } from '@/modules/users/entities/user.entity';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource);
  }
}
