import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Paged } from '@/common/paged';
import { User } from '@/models/user.model';
import { FindManyUsersQuery } from './find-many-users.query';

@QueryHandler(FindManyUsersQuery)
export class FindManyUsersHandler implements IQueryHandler<FindManyUsersQuery> {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async execute(query: FindManyUsersQuery): Promise<Paged<User>> {
    const findOptions = query.toFindOptions();

    const result = await this.userModel.findAndCountAll(findOptions);

    return new Paged(result.rows, result.count, query.current, query.pageSize);
  }
}
