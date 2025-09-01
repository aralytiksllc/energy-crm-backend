import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDocumentDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  originalName: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  mimeType: string;

  @IsOptional()
  @IsInt()
  size: number;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  path: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  documentType?: string;

  @Type(() => Number)
  @IsInt()
  customerId!: number;
}
