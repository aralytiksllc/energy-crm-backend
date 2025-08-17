// External

// Internal

export class UpdateCommand<TDto> {
  constructor(
    public readonly id: number,
    public readonly dto: TDto,
  ) {}
}
