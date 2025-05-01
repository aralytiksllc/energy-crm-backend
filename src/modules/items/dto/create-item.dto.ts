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
import { ItemType } from '../enums/item-type.enum';
import { CreateItemPhotoDto } from './create-item-photo.dto';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(ItemType)
  type: ItemType;

  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsString()
  @IsOptional()
  unit?: string;

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
  @Type(() => CreateItemPhotoDto)
  photos?: CreateItemPhotoDto[];
}
