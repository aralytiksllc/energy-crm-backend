// External dependencies
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { NotFoundException } from '@nestjs/common';

// Internal dependencies
import { User } from '../entities/user.entity';
import { FindOneUserQuery } from './find-one-user.query';

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async execute(query: FindOneUserQuery): Promise<User> {
    const user = await this.userRepository.findOne({ id: query.id });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }
}
