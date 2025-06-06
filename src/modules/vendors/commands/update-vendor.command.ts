import { UpdateCommand } from '@/common/cqrs/commands/update.command';
import { UpdateVendorDto } from '../dtos/update-vendor.dto';

export class UpdateVendorCommand extends UpdateCommand<UpdateVendorDto> {}
