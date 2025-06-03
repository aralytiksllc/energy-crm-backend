import { CreateCommand } from '@/common/cqrs/commands/create.command';
import { User } from '@/models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';

export class CreateUserCommand extends CreateCommand<CreateUserDto, User> {}
