import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@/models/user.model';
import { UserDeletedEvent } from '../events/user-deleted.event';
import { DeleteUserCommand } from './delete-user.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteUserCommand): Promise<void> {
    const { id, options } = command;

    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    await user.destroy(options);

    this.eventBus.publish(new UserDeletedEvent(user));
  }
}
