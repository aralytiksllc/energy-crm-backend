import {
  IsString,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductUnit } from '../enums/product-unit.enum';
import { CreateProductPhotoDto } from './create-product-photo.dto';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ProductUnit)
  unit: ProductUnit;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  @IsOptional()
  length?: number;

  @IsNumber()
  @IsOptional()
  width?: number;

  @IsNumber()
  @IsOptional()
  height?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsString()
  @IsOptional()
  upc?: string;

  @IsString()
  @IsOptional()
  mpn?: string;

  @IsString()
  @IsOptional()
  ean?: string;

  @IsString()
  @IsOptional()
  isbn?: string;

  @IsOptional()
  settings?: Record<string, any>;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsUUID()
  vendorId: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateProductPhotoDto)
  photos?: CreateProductPhotoDto[];
}
