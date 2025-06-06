import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { FindOneUserQuery } from './find-one-user.query';

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery> {
  constructor(
    @InjectRepository(User)
    protected readonly usersRepository: Repository<User>,
  ) {}

  async execute(query: FindOneUserQuery): Promise<Nullable<User>> {
    return this.usersRepository.findOne({
      where: { id: query.id },
      ...query.options,
    });
  }
}
