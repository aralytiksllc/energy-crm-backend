import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from '@/models/sale.model';
import { DeleteSaleCommand } from '../impl/delete-sale.command';

@CommandHandler(DeleteSaleCommand)
export class DeleteSaleHandler implements ICommandHandler<DeleteSaleCommand> {
  constructor(
    @InjectModel(Sale)
    private readonly saleModel: typeof Sale,
  ) {}

  async execute(command: DeleteSaleCommand): Promise<void> {
    await this.saleModel.destroy({
      where: { id: command.id },
    });
  }
}
