import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from '../../entities/sale.entity';
import { CreateSaleCommand } from '../impl/create-sale.command';

@CommandHandler(CreateSaleCommand)
export class CreateSaleHandler implements ICommandHandler<CreateSaleCommand> {
  constructor(
    @InjectRepository(Sale)
    private readonly repository: Repository<Sale>,
  ) {}

  async execute(command: CreateSaleCommand): Promise<Sale> {
    const entity = this.repository.create(command.dto);
    return this.repository.save(entity);
  }
}
