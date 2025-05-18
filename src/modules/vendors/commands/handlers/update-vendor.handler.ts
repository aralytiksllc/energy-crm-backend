import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Vendor } from '../../models/vendor.model';
import { UpdateVendorCommand } from '../impl/update-vendor.command';

@CommandHandler(UpdateVendorCommand)
export class UpdateVendorHandler
  implements ICommandHandler<UpdateVendorCommand>
{
  constructor(
    @InjectModel(Vendor)
    private readonly vendorModel: typeof Vendor,
  ) {}

  async execute(command: UpdateVendorCommand): Promise<Vendor> {
    const vendor = await this.vendorModel.findByPk(command.id);

    if (!vendor) throw new Error(`Vendor with ID ${command.id} not found.`);

    vendor.set(command.dto);

    await vendor.save();

    return vendor;
  }
}
