// External dependencies

// Internal dependencies

export class UpdateCommand<TDto> {
  constructor(
    public readonly id: number,
    public readonly dto: TDto,
  ) {}
}
