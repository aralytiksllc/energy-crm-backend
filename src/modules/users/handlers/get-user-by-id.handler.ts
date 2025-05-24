import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@/models/user.model';
import { GetUserByIdQuery } from '../queries/get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(
    @InjectModel(User)
    protected readonly userModel: typeof User,
  ) {}

  async execute(query: GetUserByIdQuery): Promise<User> {
    const user = await this.userModel.findByPk(query.id);

    if (!user) throw new Error(`User with ID ${query.id} not found.`);

    return user;
  }
}
