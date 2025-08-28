// External
import { PartialType } from '@nestjs/mapped-types';

// Internal
import { CreateContactDto } from './create-contact.dto';

export class UpdateContactDto extends PartialType(CreateContactDto) {}
