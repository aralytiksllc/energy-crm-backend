import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { User } from '../../entities/user.entity';
import { GetUserByIdQuery } from '../impl/get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @InjectRepository(User) protected readonly repository: Repository<User>,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const where = { id: query.id } as FindOptionsWhere<User>;
    return await this.repository.findOneByOrFail(where);
  }
}
