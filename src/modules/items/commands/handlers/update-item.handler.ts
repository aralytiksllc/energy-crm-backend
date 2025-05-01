import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Item } from '../../entities/item.entity';
import { UpdateItemCommand } from '../impl/update-item.command';

@CommandHandler(UpdateItemCommand)
export class UpdateItemHandler implements ICommandHandler<UpdateItemCommand> {
  constructor(
    @InjectRepository(Item)
    private readonly repository: Repository<Item>,
  ) {}

  async execute(command: UpdateItemCommand): Promise<Item> {
    const where = { id: command.id } as FindOptionsWhere<Item>;
    const entity = await this.repository.findOneByOrFail(where);

    Object.assign(entity, command.dto);
    return this.repository.save(entity);
  }
}
