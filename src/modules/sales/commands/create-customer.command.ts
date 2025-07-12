import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { CreateCustomerDto } from '../dtos/create-customer.dto';

export class CreateCustomerCommand extends CreateCommand<CreateCustomerDto> {}
