import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { Vendor } from '../../entities/vendor.entity';
import { UpdateVendorCommand } from '../impl/update-vendor.command';

@CommandHandler(UpdateVendorCommand)
export class UpdateVendorHandler
  implements ICommandHandler<UpdateVendorCommand>
{
  constructor(
    @InjectRepository(Vendor)
    private readonly repository: Repository<Vendor>,
  ) {}

  async execute(command: UpdateVendorCommand): Promise<Vendor> {
    const where = { id: command.id } as FindOptionsWhere<Vendor>;
    const entity = await this.repository.findOneByOrFail(where);

    Object.assign(entity, command.dto);
    return this.repository.save(entity);
  }
}
