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
    @InjectModel(Vendor)
    private readonly vendorModel: typeof Vendor,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateVendorCommand): Promise<Vendor> {
    const { dto, options } = command;

    const vendor = await this.vendorModel.create(dto, options);

    this.eventBus.publish(new VendorCreatedEvent(vendor));

    return vendor;
  }
}
