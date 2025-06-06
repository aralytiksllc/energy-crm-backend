import { Repository, DataSource, EntityTarget, FindOneOptions } from 'typeorm';
import deepmerge from 'deepmerge';
import { BaseEntity } from './base.entity';

export abstract class BaseRepository<
  TEntity extends BaseEntity,
> extends Repository<TEntity> {
  constructor(
    protected readonly entity: EntityTarget<TEntity>,
    protected readonly dataSource: DataSource,
  ) {
    super(entity, dataSource.createEntityManager());
  }

  async findOneById(
    id: number,
    options: FindOneOptions<TEntity> = {},
  ): Promise<Nullable<TEntity>> {
    const defaultOptions: FindOneOptions<TEntity> = { where: { id } as any };

    const mergedOptions = deepmerge(defaultOptions, options);

    return this.findOne(mergedOptions);
  }

  async findOneByIdOrFail(
    id: number,
    options: FindOneOptions<TEntity> = {},
  ): Promise<TEntity> {
    const defaultOptions: FindOneOptions<TEntity> = { where: { id } as any };

    const mergedOptions = deepmerge(defaultOptions, options);

    return this.findOneOrFail(mergedOptions);
  }
}
