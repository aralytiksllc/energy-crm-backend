import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from '../../entities/sale.entity';
import { DeleteSaleCommand } from '../impl/delete-sale.command';

@CommandHandler(DeleteSaleCommand)
export class DeleteSaleHandler implements ICommandHandler<DeleteSaleCommand> {
  constructor(
    @InjectRepository(Sale)
    private readonly repository: Repository<Sale>,
  ) {}

  async execute(command: DeleteSaleCommand): Promise<void> {
    await this.repository.delete(command.id);
  }
}
