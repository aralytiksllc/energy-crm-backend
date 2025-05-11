import { 
  IsUUID, 
  IsDateString, 
  IsOptional, 
  IsString, 
  ValidateNested, 
  ArrayMinSize 
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSaleItemDto } from './create-sale-item.dto';

export class CreateSaleDto {
  @IsDateString()
  saleDate: string;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsUUID()
  customerId: string;

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateSaleItemDto)
  items: CreateSaleItemDto[];
}
