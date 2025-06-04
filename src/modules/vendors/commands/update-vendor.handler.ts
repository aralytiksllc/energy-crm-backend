import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Vendor } from '@/models/vendor.model';
import { VendorUpdatedEvent } from '../events/vendor-updated.event';
import { UpdateVendorCommand } from './update-vendor.command';

@CommandHandler(UpdateVendorCommand)
export class UpdateVendorHandler
  implements ICommandHandler<UpdateVendorCommand>
{
  constructor(
    @InjectModel(Vendor)
    private readonly vendorModel: typeof Vendor,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: UpdateVendorCommand): Promise<Vendor> {
    const { id, dto, options } = command;

    const vendor = await this.vendorModel.findByPk(id);

    if (!vendor) {
      throw new Error(`Vendor with id ${id} not found`);
    }

    await vendor.update(dto, options);

    this.eventBus.publish(new VendorUpdatedEvent(vendor));

    return vendor;
  }
}
