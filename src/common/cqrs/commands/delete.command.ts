import { RemoveOptions } from 'typeorm';

export class DeleteCommand {
  constructor(
    public readonly id: number,
    public readonly options?: RemoveOptions,
  ) {}
}
