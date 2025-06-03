import { DeleteCommand } from '@/common/cqrs/commands/delete.command';
import { User } from '@/models/user.model';

export class DeleteUserCommand extends DeleteCommand<User> {}
