export class Paged<T> {
  constructor(
    public readonly items: T[],
    public readonly total: number,
    public readonly current: number,
    public readonly pageSize: number,
  ) {}
}
