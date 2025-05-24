import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@/models/user.model';
import { DeleteUserCommand } from '../commands/delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    await this.userModel.destroy({
      where: { id: command.id },
    });
  }
}
