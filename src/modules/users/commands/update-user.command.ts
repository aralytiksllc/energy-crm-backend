import { UpdateCommand } from '@/common/cqrs/commands/update.command';
import { User } from '@/models/user.model';
import { UpdateUserDto } from '../dtos/update-user.dto';

export class UpdateUserCommand extends UpdateCommand<UpdateUserDto, User> {}
