import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../../entities/vendor.entity';
import { CreateVendorCommand } from '../impl/create-vendor.command';

@CommandHandler(CreateVendorCommand)
export class CreateVendorHandler
  implements ICommandHandler<CreateVendorCommand>
{
  constructor(
    @InjectRepository(Vendor)
    private readonly repository: Repository<Vendor>,
  ) {}

  async execute(command: CreateVendorCommand): Promise<Vendor> {
    const entity = this.repository.create(command.dto);
    return this.repository.save(entity);
  }
}
