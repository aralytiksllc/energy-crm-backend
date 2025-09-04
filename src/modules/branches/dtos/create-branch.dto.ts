import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateBranchDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cityRegion?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  operationalStatus?: string;

  @ApiProperty()
  @IsNumber()
  customerId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  contactId?: number;
}
