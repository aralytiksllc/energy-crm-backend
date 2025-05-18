import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../../models/product.model';
import { UpdateProductCommand } from '../impl/update-product.command';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async execute(command: UpdateProductCommand): Promise<Product> {
    const product = await this.productModel.findByPk(command.id);

    if (!product) throw new Error(`Product with ID ${command.id} not found`);

    product.set(command.dto);

    await product.save();

    return product;
  }
}
