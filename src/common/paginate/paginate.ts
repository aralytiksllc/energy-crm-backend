export class Paginate<T> {
  readonly items: T[];
  readonly total: number;
  readonly current: number;
  readonly pageSize: number;

  constructor(
    items: T[],
    total: number,
    skip?: number | null,
    take?: number | null,
  ) {
    this.items = items ?? [];
    this.total = Math.max(0, Math.floor(total ?? 0));

    const size = Math.max(1, Math.floor(take ?? 20));
    const offset = Math.max(0, Math.floor(skip ?? 0));

    this.pageSize = size;
    this.current = this.total > 0 ? Math.floor(offset / size) + 1 : 1;
  }
}
