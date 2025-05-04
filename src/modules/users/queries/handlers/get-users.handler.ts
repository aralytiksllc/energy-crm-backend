import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pagination, PaginationResult } from "@/common/pagination"
import { User } from '../../entities/user.entity';
import { GetUsersQuery } from '../impl/get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectRepository(User) protected readonly repository: Repository<User>,
  ) { }

  async execute(query: GetUsersQuery): Promise<Promise<PaginationResult<User>>> {
    const pagination = new Pagination({ page: query.page, limit: query.limit });

    const [items, total] = await this.repository.findAndCount(query.toFindOptions());

    return pagination.getResult(items, total);
  }
}
