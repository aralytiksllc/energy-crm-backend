// External dependencies

// Internal dependencies
import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';

export class ForgotPasswordCommand extends CreateCommand<ForgotPasswordDto> {}
