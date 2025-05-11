export class Paging<T> {
  constructor(
    public readonly items: T[],
    public readonly total: number,
  ) {}
}
