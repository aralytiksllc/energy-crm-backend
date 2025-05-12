import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { UpdateProductCommand } from '../impl/update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async execute(command: UpdateProductCommand): Promise<Product> {
    const where = { id: command.id } as FindOptionsWhere<Product>;
    const entity = await this.repository.findOneByOrFail(where);

    Object.assign(entity, command.dto);
    return this.repository.save(entity);
  }
}
