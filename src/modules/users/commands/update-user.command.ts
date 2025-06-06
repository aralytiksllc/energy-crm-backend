import { UpdateCommand } from '@/common/cqrs/commands/update.command';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class UpdateUserCommand extends UpdateCommand<UpdateUserDto> {}
