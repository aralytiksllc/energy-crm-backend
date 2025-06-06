import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '@/entities/vendor.entity';
import { VendorUpdatedEvent } from '../events/vendor-updated.event';
import { UpdateVendorCommand } from './update-vendor.command';

@CommandHandler(UpdateVendorCommand)
export class UpdateVendorHandler
  implements ICommandHandler<UpdateVendorCommand>
{
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateVendorCommand): Promise<Vendor> {
    const { id, dto } = command;

    const vendor = await this.vendorRepository.findOneBy({ id });

    if (!vendor) {
      throw new Error(`Vendor with id ${id} not found`);
    }

    const updatedVendor = this.vendorRepository.merge(vendor, dto);

    await this.vendorRepository.save(updatedVendor);

    this.eventBus.publish(new VendorUpdatedEvent(updatedVendor));

    return updatedVendor;
  }
}
