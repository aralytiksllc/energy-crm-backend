// External

// Internal

export class DeleteBranchCommand {
  constructor(
    public readonly customerId: number,
    public readonly id: number,
  ) {}
}
