import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateItemPhotoDto {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
