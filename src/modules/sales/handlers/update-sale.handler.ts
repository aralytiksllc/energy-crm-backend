import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from '@/models/sale.model';
import { UpdateSaleCommand } from '../commands/update-sale.command';

@CommandHandler(UpdateSaleCommand)
export class UpdateSaleHandler implements ICommandHandler<UpdateSaleCommand> {
  constructor(
    @InjectModel(Sale)
    private readonly saleModel: typeof Sale,
  ) {}

  async execute(command: UpdateSaleCommand): Promise<Sale> {
    const sale = await this.saleModel.findByPk(command.id);

    if (!sale) throw new Error(`Sale with ID ${command.id} not found.`);

    sale.set(command.dto as any);

    await sale.save();

    return sale;
  }
}
