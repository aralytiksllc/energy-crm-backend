import { SaveOptions } from 'typeorm';

export class CreateCommand<TDto> {
  constructor(
    public readonly dto: TDto,
    public readonly options?: SaveOptions,
  ) {}
}
