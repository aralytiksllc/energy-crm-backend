import { SaveOptions } from 'typeorm';

export class UpdateCommand<TDto> {
  constructor(
    public readonly id: number,
    public readonly dto: TDto,
    public readonly options?: SaveOptions,
  ) {}
}
