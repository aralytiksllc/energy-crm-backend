import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paged } from '@/common/paged';
import { User } from '../entities/user.entity';
import { FindManyUsersQuery } from './find-many-users.query';

@QueryHandler(FindManyUsersQuery)
export class FindManyUsersHandler implements IQueryHandler<FindManyUsersQuery> {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async execute(query: FindManyUsersQuery): Promise<Paged<User>> {
    const options = query.toFindManyOptions();

    const [rows, count] = await this.usersRepository.findAndCount(options);

    return new Paged(rows, count, query.current, query.pageSize);
  }
}
