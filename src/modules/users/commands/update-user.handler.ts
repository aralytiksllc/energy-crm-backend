import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@/models/user.model';
import { UserUpdatedEvent } from '../events/user-updated.event';
import { UpdateUserCommand } from './update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const { id, dto, options } = command;

    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }

    await user.update(dto, options);

    this.eventBus.publish(new UserUpdatedEvent(user));

    return user;
  }
}
