import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductPhotoDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
