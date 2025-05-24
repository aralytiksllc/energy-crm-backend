import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '@/models/product.model';
import { CreateProductCommand } from '../impl/create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async execute(command: CreateProductCommand): Promise<Product> {
    return await this.productModel.create(command.dto as any);
  }
}
