import { UpdateCustomerDto } from '../dto/update-customer.dto';

export class UpdateCustomerCommand {
  constructor(
    public readonly id: number,
    public readonly dto: UpdateCustomerDto,
  ) {}
}
