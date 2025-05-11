import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paging } from '@/common/paging';
import { User } from '../../entities/user.entity';
import { GetUsersQuery } from '../impl/get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(User) protected readonly repository: Repository<User>,
  ) {}

  async execute(query: GetUsersQuery): Promise<Paging<User>> {
    const findOptions = query.toFindOptions();

    const [items, total] = await this.repository.findAndCount(findOptions);

    return new Paging(items, total);
  }
}
