// External dependencies

// Internal dependencies
import { UpdateCommand } from '@/common/cqrs/commands/update.command';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';

export class UpdateCustomerCommand extends UpdateCommand<UpdateCustomerDto> {}
