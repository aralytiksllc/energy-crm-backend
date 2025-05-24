import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Paging } from '@/common/paging';
import { User } from '@/models/user.model';
import { GetUsersQuery } from '../impl/get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    @InjectModel(User)
    protected readonly userModel: typeof User,
  ) {}

  async execute(query: GetUsersQuery): Promise<Paging<User>> {
    const sequelizeOptions = query.toSequelizeOptions();

    const { rows, count } =
      await this.userModel.findAndCountAll(sequelizeOptions);

    return new Paging(rows, count);
  }
}
