import { CreateSaleDto } from '../dto/create-sale.dto';

export class CreateSaleCommand {
  constructor(public readonly dto: CreateSaleDto) {}
}
