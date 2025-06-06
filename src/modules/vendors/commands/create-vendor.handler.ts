import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../entities/vendor.entity';
import { VendorCreatedEvent } from '../events/vendor-created.event';
import { CreateVendorCommand } from './create-vendor.command';

@CommandHandler(CreateVendorCommand)
export class CreateVendorHandler
  implements ICommandHandler<CreateVendorCommand>
{
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateVendorCommand): Promise<Vendor> {
    const { dto } = command;

    const entity = this.vendorRepository.create(dto);

    const vendor = await this.vendorRepository.save(entity);

    this.eventBus.publish(new VendorCreatedEvent(vendor));

    return vendor;
  }
}
