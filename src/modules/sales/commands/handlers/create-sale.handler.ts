import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from '@/models/sale.model';
import { CreateSaleCommand } from '../impl/create-sale.command';

@CommandHandler(CreateSaleCommand)
export class CreateSaleHandler implements ICommandHandler<CreateSaleCommand> {
  constructor(
    @InjectModel(Sale)
    private readonly saleModel: typeof Sale,
  ) {}

  async execute(command: CreateSaleCommand): Promise<Sale> {
    return await this.saleModel.create(command.dto as any);
  }
}
