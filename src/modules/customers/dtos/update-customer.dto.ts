// External
import { PartialType } from '@nestjs/mapped-types';

// Internal
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
