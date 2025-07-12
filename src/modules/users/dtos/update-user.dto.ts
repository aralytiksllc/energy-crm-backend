// External dependencies
import { PartialType } from '@nestjs/mapped-types';

// Internal dependencies
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
