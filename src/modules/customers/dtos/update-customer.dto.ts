// External dependencies
import { PartialType } from '@nestjs/mapped-types';

// Internal dependencies
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
