import { CreateSaleDto } from '../../dto/create-sale-item.dto';

export class CreateSaleCommand {
  constructor(public readonly dto: CreateSaleDto) {}
}
