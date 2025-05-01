import { PartialType } from '@nestjs/mapped-types';
import { CreateItemPhotoDto } from './create-item-photo.dto';

export class UpdateItemPhotoDto extends PartialType(CreateItemPhotoDto) {}
