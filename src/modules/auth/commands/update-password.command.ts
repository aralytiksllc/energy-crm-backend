// External dependencies

// Internal dependencies
import { UpdatePasswordDto } from '../dtos/update-password.dto';

export class UpdatePasswordCommand {
  constructor(public readonly dto: UpdatePasswordDto) {}
}
