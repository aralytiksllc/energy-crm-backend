import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Vendor } from '@/models/vendor.model';
import { DeleteVendorCommand } from './delete-vendor.command';
import { VendorDeletedEvent } from '../events/vendor-deleted.event';

@CommandHandler(DeleteVendorCommand)
export class DeleteVendorHandler
  implements ICommandHandler<DeleteVendorCommand>
{
  constructor(
    @InjectModel(Vendor)
    private readonly vendorModel: typeof Vendor,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: DeleteVendorCommand): Promise<Vendor> {
    const { id, options } = command;

    const vendor = await this.vendorModel.findByPk(id);

    if (!vendor) {
      throw new Error(`Vendor with id ${id} not found`);
    }

    await vendor.destroy(options);

    this.eventBus.publish(new VendorDeletedEvent(vendor));

    return vendor;
  }
}
