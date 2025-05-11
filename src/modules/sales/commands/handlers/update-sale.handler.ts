import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Sale } from '../../entities/sale.entity';
import { UpdateSaleCommand } from '../impl/update-sale.command';

@CommandHandler(UpdateSaleCommand)
export class UpdateSaleHandler implements ICommandHandler<UpdateSaleCommand> {
  constructor(
    @InjectRepository(Sale)
    private readonly repository: Repository<Sale>,
  ) {}

  async execute(command: UpdateSaleCommand): Promise<Sale> {
    const where = { id: command.id } as FindOptionsWhere<Sale>;
    const entity = await this.repository.findOneByOrFail(where);

    Object.assign(entity, command.dto);
    return this.repository.save(entity);
  }
}
