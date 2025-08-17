// External
import { IsInt, IsOptional, IsString, IsNumber } from 'class-validator';

// Internal

export class CreateBranchDto {
  @IsString()
  branchName: string;

  @IsOptional()
  @IsNumber()
  peakLoadKw?: number;

  @IsOptional()
  @IsString()
  weatherDataLinkage?: string;

  @IsOptional()
  @IsInt()
  customerId?: number;
}
