import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@/models/user.model';
import { FindOneUserQuery } from './find-one-user.query';

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery> {
  constructor(
    @InjectModel(User)
    protected readonly userModel: typeof User,
  ) {}

  async execute(query: FindOneUserQuery): Promise<Nullable<User>> {
    return this.userModel.findByPk(query.id, query.options);
  }
}
