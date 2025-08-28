// External
import { IsString, IsOptional, IsNumber, IsInt } from 'class-validator';

// Internal

export class CreateContactDto {
  @IsString()
  contactName: string;

  @IsOptional()
  @IsNumber()
  peakLoadKw?: number;

  @IsOptional()
  @IsString()
  weatherDataLinkage?: string;

  @IsInt()
  customerId: number;
}
