import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@/models/user.model';
import { UpdateUserCommand } from '../impl/update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const user = await this.userModel.findByPk(command.id);

    if (!user) throw new Error(`User with ID ${command.id} not found.`);

    user.set(command.dto);

    await user.save();

    return user;
  }
}
