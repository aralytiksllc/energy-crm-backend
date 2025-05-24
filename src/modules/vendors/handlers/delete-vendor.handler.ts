import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Vendor } from '@/models/vendor.model';
import { DeleteVendorCommand } from '../commands/impl/delete-vendor.command';

@CommandHandler(DeleteVendorCommand)
export class DeleteVendorHandler
  implements ICommandHandler<DeleteVendorCommand>
{
  constructor(
    @InjectModel(Vendor)
    private readonly vendorModel: typeof Vendor,
  ) {}

  async execute(command: DeleteVendorCommand): Promise<void> {
    await this.vendorModel.destroy({
      where: { id: command.id },
    });
  }
}
