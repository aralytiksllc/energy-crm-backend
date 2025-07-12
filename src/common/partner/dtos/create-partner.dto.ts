import { IsString, IsOptional, IsEmail, Length } from 'class-validator';

export abstract class CreatePartnerDto {
  @IsString()
  @Length(1, 255)
  name: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  businessName?: string;

  @IsOptional()
  @IsEmail()
  @Length(1, 255)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  addressLine1?: string;

  @IsOptional()
  @IsString()
  @Length(1, 255)
  addressLine2?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  city?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  state?: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  zip?: string;

  @IsOptional()
  @IsString()
  @Length(1, 100)
  country?: string;
}
