import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { CreateVendorDto } from '../dtos/create-vendor.dto';

export class CreateVendorCommand extends CreateCommand<CreateVendorDto
> {}
