import { FindOneOptions } from 'typeorm';

export class FindOneQuery<TEntity> {
  constructor(
    public readonly id: number,
    public readonly options: Omit<FindOneOptions<TEntity>, 'where'> = {},
  ) {}
}
