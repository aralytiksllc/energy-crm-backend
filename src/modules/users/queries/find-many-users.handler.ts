// External dependencies
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

// Internal dependencies
import { Paged } from '@/common/paged';
import { User } from '../entities/user.entity';
import { FindManyUserQuery } from './find-many-users.query';

@QueryHandler(FindManyUserQuery)
export class FindManyUserHandler implements IQueryHandler<FindManyUserQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async execute(query: FindManyUserQuery): Promise<Paged<User>> {
    const [rows, count] = await this.userRepository.findAndCount({}, {});

    return new Paged(rows, count, query.current, query.pageSize);
  }
}
