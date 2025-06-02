import * as SequelizeTypes from 'sequelize';
import { BaseModel } from './base.model';

export type Context = {
  userId: number;
};

export type ContextPayload = {
  context?: Context;
};

export type CreatePayload<TModel extends BaseModel<TModel>> =
  SequelizeTypes.CreationAttributes<TModel>;

export type CreateOptions<TModel extends BaseModel<TModel>> =
  SequelizeTypes.CreateOptions<SequelizeTypes.InferAttributes<TModel>> &
    ContextPayload;

export type UpdatePayload<TModel extends BaseModel<TModel>> = Partial<TModel>;

export type UpdateOptions<TModel extends BaseModel<TModel>> =
  SequelizeTypes.InstanceUpdateOptions<SequelizeTypes.InferAttributes<TModel>> &
    ContextPayload;

export type DestroyOptions<TModel extends BaseModel<TModel>> =
  SequelizeTypes.InstanceDestroyOptions & ContextPayload;
