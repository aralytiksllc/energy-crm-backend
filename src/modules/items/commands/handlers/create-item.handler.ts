import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../../entities/item.entity';
import { CreateItemCommand } from '../impl/create-item.command';

@CommandHandler(CreateItemCommand)
export class CreateItemHandler implements ICommandHandler<CreateItemCommand> {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>,
  ) {}

  async execute(command: CreateItemCommand): Promise<Item> {
    const entity = this.repository.create(command.dto);
    return this.repository.save(entity);
  }
}
