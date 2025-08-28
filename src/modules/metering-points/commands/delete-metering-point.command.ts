// External

// Internal

export class DeleteMeteringPointCommand {
  constructor(
    public readonly branchId: number,
    public readonly id: number,
  ) {}
}
