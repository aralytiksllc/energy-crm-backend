// External dependencies
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';

// Internal dependencies
import { Paged } from '@/common/paged';
import { User } from '@/modules/users/entities/user.entity';
import { UsersRepository } from '../users.repository';
import { FindManyUsersQuery } from './find-many-users.query';

@QueryHandler(FindManyUsersQuery)
export class FindManyUsersHandler implements IQueryHandler<FindManyUsersQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: FindManyUsersQuery): Promise<Paged<User>> {
    const options = query.toFindManyOptions();

    const [rows, count] = await this.usersRepository.findAndCount(options);

    return new Paged(rows, count, query.current, query.pageSize);
  }
}
