// External

// Internal
import { LoginDto } from '../dtos/login.dto';

export class LoginCommand {
  constructor(public readonly dto: LoginDto) {}
}
