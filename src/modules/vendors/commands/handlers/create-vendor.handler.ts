import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Vendor } from '@/models/vendor.model';
import { CreateVendorCommand } from '../impl/create-vendor.command';

@CommandHandler(CreateVendorCommand)
export class CreateVendorHandler
  implements ICommandHandler<CreateVendorCommand>
{
  constructor(
    @InjectModel(Vendor)
    private readonly vendorModel: typeof Vendor,
  ) {}

  async execute(command: CreateVendorCommand): Promise<Vendor> {
    return await this.vendorModel.create(command.dto as any);
  }
}
