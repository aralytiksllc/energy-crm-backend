import { DeleteCommand } from '@/common/cqrs/commands/delete.command';
import { Vendor } from '@/models/vendor.model';

export class DeleteVendorCommand extends DeleteCommand<Vendor> {}
