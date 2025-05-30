import {
  Model,
  ModelStatic,
  CreateOptions,
  InstanceUpdateOptions,
  InstanceDestroyOptions,
  WhereOptions,
  CreationAttributes,
} from 'sequelize';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Query } from '@/common/query';
import { CurrentUserService } from '../../shared/current-user.service';
import { Actions, Subjects } from '../../casl/casl-ability.factory';

export type UpdateOptions<T> = InstanceUpdateOptions<T>;

export type DestroyOptions<T> = InstanceDestroyOptions;

export abstract class BaseService<T extends Model> {
  protected constructor(
    protected readonly model: ModelStatic<T>,
    protected readonly currentUser: CurrentUserService,
  ) {}

  protected get subject(): Subjects {
    return this.model.name as Subjects;
  }

  protected get label(): string {
    return this.model.name[0].toUpperCase() + this.model.name.slice(1);
  }

  protected getUserId(): number {
    return this.currentUser.getUserId();
  }

  protected getOptionsWithContext<TOptions>(
    options?: TOptions,
  ): TOptions & { context: { userId: number } } {
    return Object.assign({}, options, {
      context: { userId: this.getUserId() },
    });
  }

  protected async findByIdOrFail(id: number): Promise<T> {
    const record = await this.model.findByPk(id);

    if (!record) {
      const label = this.label;
      throw new NotFoundException(`${label} with ID ${id} not found.`);
    }

    return record;
  }

  async findAll(query: Query<T>): Promise<T[]> {
    if (this.currentUser.can('manage', this.subject)) {
      const finalOptions = query.toFindOptions();
      return this.model.findAll(finalOptions);
    }

    const where: WhereOptions = { createdById: this.getUserId() };
    const finalOptions = query.toFindOptions({ where });
    return this.model.findAll(finalOptions);
  }

  async findOne(id: number): Promise<T> {
    const record = await this.findByIdOrFail(id);
    const subject = this.subject;

    if (!this.currentUser.can('read', subject, record)) {
      throw new ForbiddenException(
        `You are not authorized to read ${subject} with ID ${id}.`,
      );
    }

    return record;
  }

  async create(
    data: CreationAttributes<T>,
    options?: CreateOptions<T>,
  ): Promise<T> {
    const subject = this.subject;

    if (!this.currentUser.can('create', subject)) {
      throw new ForbiddenException(
        `You are not authorized to create a ${subject}.`,
      );
    }

    const finalOptions = this.getOptionsWithContext(options);

    return this.model.create(data, finalOptions);
  }

  async update(
    id: number,
    data: Partial<T>,
    options: InstanceUpdateOptions<T>,
  ): Promise<T> {
    const record = await this.findByIdOrFail(id);
    const subject = this.subject;

    if (!this.currentUser.can('update', subject, record)) {
      throw new ForbiddenException(
        `You are not authorized to update ${subject} with ID ${id}.`,
      );
    }

    const finalOptions = this.getOptionsWithContext(options);

    return record.update(data, finalOptions);
  }

  async destroy(id: number, options?: InstanceDestroyOptions): Promise<T> {
    const record = await this.findByIdOrFail(id);
    const subject = this.subject;

    if (!this.currentUser.can('delete', subject, record)) {
      throw new ForbiddenException(
        `You are not authorized to delete ${subject} with ID ${id}.`,
      );
    }

    const finalOptions = this.getOptionsWithContext(options);

    await record.destroy(finalOptions);

    return record;
  }
}
