import { ModelStatic } from 'sequelize';
import { merge } from 'lodash';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { CurrentUserService } from '@/common/current-user';
import { BaseModel } from './base.model';

import {
  CreatePayload,
  CreateOptions,
  UpdatePayload,
  UpdateOptions,
  DestroyOptions,
  Context,
  ContextPayload,
} from './base.types';

import { ICommand, ICommandHandler } from '@nestjs/cqrs';

export abstract class BaseCommandHandler<
  TModel extends BaseModel<TModel>,
  TCommand extends ICommand = ICommand,
> implements ICommandHandler<ICommand>
{
  protected constructor(
    protected readonly model: ModelStatic<TModel>,
    protected readonly currentUser: CurrentUserService,
  ) {}

  abstract execute(command: TCommand): Promise<TModel>;

  protected get subject(): any {
    return this.model.name as any;
  }

  protected getUserId(): number {
    return this.currentUser.getUserId();
  }

  protected getContextOptions<TOptions = object>(
    options?: TOptions,
  ): TOptions & ContextPayload {
    const context: Context = { userId: this.getUserId() };

    return merge({}, options, { context });
  }

  protected async findByIdOrFail(id: number): Promise<TModel> {
    const record = await this.model.findByPk(id);
    const subject = this.subject;

    if (!record) {
      throw new NotFoundException(`${subject} with ID ${id} not found.`);
    }

    return record;
  }

  public async create(
    payload: CreatePayload<TModel>,
    options?: CreateOptions<TModel>,
  ): Promise<TModel> {
    const subject = this.subject;

    if (!this.currentUser.canCreate(subject)) {
      throw new ForbiddenException(
        `You are not authorized to create a ${subject}.`,
      );
    }

    const contextOptions = this.getContextOptions(options);

    return this.model.create(payload, contextOptions);
  }

  public async update(
    id: number,
    payload: UpdatePayload<TModel>,
    options?: UpdateOptions<TModel>,
  ): Promise<TModel> {
    const record = await this.findByIdOrFail(id);
    const subject = this.subject;

    if (!this.currentUser.canUpdate(subject, record)) {
      throw new ForbiddenException(
        `You are not authorized to update ${subject} with ID ${id}.`,
      );
    }

    const contextOptions = this.getContextOptions(options);

    return record.update(payload, contextOptions);
  }

  public async destroy(
    id: number,
    options?: DestroyOptions<TModel>,
  ): Promise<TModel> {
    const record = await this.findByIdOrFail(id);
    const subject = this.subject;

    if (!this.currentUser.canDestroy(subject, record)) {
      throw new ForbiddenException(
        `You are not authorized to delete ${subject} with ID ${id}.`,
      );
    }

    const contextOptions = this.getContextOptions(options);

    await record.destroy(contextOptions);

    return record;
  }
}
