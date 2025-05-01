import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../../entities/item.entity';
import { DeleteItemCommand } from '../impl/delete-item.command';

@CommandHandler(DeleteItemCommand)
export class DeleteItemHandler implements ICommandHandler<DeleteItemCommand> {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>,
  ) {}

  async execute(command: DeleteItemCommand): Promise<void> {
    await this.repository.delete(command.id);
  }
}
