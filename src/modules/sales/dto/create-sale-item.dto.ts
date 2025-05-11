import { IsUUID, IsNumber, IsOptional, Min, Max } from 'class-validator';

export class CreateSaleItemDto {
  @IsUUID()
  itemId: string;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  @IsOptional()
  discount?: number;
}
