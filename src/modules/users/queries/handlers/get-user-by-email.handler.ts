import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@/models/user.model';
import { GetUserByEmailQuery } from '../get-user-by-email.query';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(
    @InjectModel(User)
    protected readonly userModel: typeof User,
  ) {}

  async execute(query: GetUserByEmailQuery): Promise<User | null> {
    return await this.userModel.findOne({
      where: { email: query.email },
    });
  }
}
