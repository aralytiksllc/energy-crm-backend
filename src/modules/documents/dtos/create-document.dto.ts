// External
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

// Internal

export class CreateDocumentDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  documentType?: string;

  @ApiProperty()
  @IsNumber()
  customerId: number;
}
