import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '@/entities/vendor.entity';
import { VendorDeletedEvent } from '../events/vendor-deleted.event';
import { DeleteVendorCommand } from './delete-vendor.command';

@CommandHandler(DeleteVendorCommand)
export class DeleteVendorHandler
  implements ICommandHandler<DeleteVendorCommand>
{
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteVendorCommand): Promise<Vendor> {
    const { id, options } = command;

    const vendor = await this.vendorRepository.findOne({ where: { id } });

    if (!vendor) {
      throw new Error(`Vendor with id ${id} not found`);
    }

    await this.vendorRepository.remove(vendor);

    this.eventBus.publish(new VendorDeletedEvent(vendor));

    return vendor;
  }
}
