import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { GetUsersQuery } from '../impl/get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(User) protected readonly repository: Repository<User>,
  ) { }

  async execute(query: GetUsersQuery): Promise<User[]> {
    return await this.repository.find(query.toFindOptions());
  }
}
