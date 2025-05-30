import {
  Model,
  CreateOptions,
  InstanceDestroyOptions,
  InstanceUpdateOptions,
} from 'sequelize';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ICommand, ICommandHandler } from '@nestjs/cqrs';
import { CurrentUserService } from '../../shared/current-user.service';
import { Actions, Subjects } from '../../casl/casl-ability.factory';

export abstract class BaseCommandHandler<
  T extends Model,
  TCommand extends ICommand,
> implements ICommandHandler<TCommand>
{
  protected constructor(
    protected readonly model: { new (): T } & typeof Model,
    protected readonly currentUser: CurrentUserService,
  ) {}

  abstract execute(command: TCommand): Promise<any>;

  protected getUserId(): number {
    return this.currentUser.getUserId();
  }

  protected can(action: Actions, record?: any) {
    const subject = this.model.name as Subjects;
    if (!this.currentUser.can(action, subject, record)) {
      throw new ForbiddenException(
        `You are not authorized to ${action} ${subject}.`,
      );
    }
  }

  protected getContext(options?: any): any {
    return Object.assign({}, options, {
      context: { userId: this.getUserId() },
    });
  }

  protected async findByIdOrFail(id: number): Promise<T> {
    const entity = await this.model.findByPk(id);
    if (!entity) {
      const label = this.model.name;
      throw new NotFoundException(`${label} with ID ${id} not found.`);
    }
    return entity as T;
  }

  async findAll(query: any): Promise<T[]> {
    const subject = this.model.name as Subjects;
    const ownershipRequired = this.currentUser.requiresOwnership(
      'read',
      subject,
    );
    const where = ownershipRequired
      ? { createdById: this.getUserId() }
      : undefined;
    const options = query.toFindOptions({ where });
    return (await this.model.findAll(options)) as T[];
  }

  async findOne(id: number): Promise<T> {
    const entity = await this.findByIdOrFail(id);
    this.can('read', entity);
    return entity as T;
  }

  async create(data: any, options?: CreateOptions<any>): Promise<T> {
    this.can('create');
    const context = this.getContext(options);
    return (await this.model.create(data, context)) as T;
  }

  async update(
    id: number,
    data: any,
    options?: InstanceUpdateOptions<any>,
  ): Promise<T> {
    const entity = await this.findByIdOrFail(id);
    this.can('update', entity);
    const context = this.getContext(options);
    return (await entity.update(data, context)) as T;
  }

  async delete(id: number, options?: InstanceDestroyOptions): Promise<T> {
    const entity = await this.findByIdOrFail(id);
    this.can('delete', entity);
    const context = this.getContext(options);
    await entity.destroy(context);
    return entity as T;
  }
}
