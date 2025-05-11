import { UpdateSaleDto } from '../../dto/create-sale.dto';

export class UpdateSaleCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateSaleDto,
  ) {}
}
