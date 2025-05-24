import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '@/models/product.model';
import { DeleteProductCommand } from '../impl/delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async execute(command: DeleteProductCommand): Promise<void> {
    await this.productModel.destroy({
      where: { id: command.id },
    });
  }
}
