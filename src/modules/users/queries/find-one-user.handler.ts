import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '@/entities/user.entity';
import { UsersRepository } from '../users.repository';
import { FindOneUserQuery } from './find-one-user.query';

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery> {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(query: FindOneUserQuery): Promise<User> {
    return this.usersRepository.findOneByIdOrFail(query.id, query.options);
  }
}
