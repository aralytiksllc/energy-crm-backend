import { UpdateSaleDto } from '../../dto/update-sale.dto';

export class UpdateSaleCommand {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateSaleDto,
  ) {}
}
