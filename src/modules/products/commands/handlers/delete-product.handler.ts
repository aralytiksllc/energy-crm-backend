import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { DeleteProductCommand } from '../impl/delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    await this.repository.delete(command.id);
  }
}
