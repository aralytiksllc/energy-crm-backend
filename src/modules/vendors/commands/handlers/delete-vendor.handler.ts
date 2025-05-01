import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../../entities/vendor.entity';
import { DeleteVendorCommand } from '../impl/delete-vendor.command';

@CommandHandler(DeleteVendorCommand)
export class DeleteVendorHandler
  implements ICommandHandler<DeleteVendorCommand>
{
  constructor(
    @InjectRepository(Vendor)
    private readonly repository: Repository<Vendor>,
  ) {}

  async execute(command: DeleteVendorCommand): Promise<void> {
    await this.repository.delete(command.id);
  }
}
