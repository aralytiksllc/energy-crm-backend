import {
  PaginationParams,
  PaginationResult,
  PaginationMeta,
} from './pagination.interfaces';

export class Pagination {
  private static readonly DEFAULT_PAGE = 1;
  private static readonly DEFAULT_PAGE_SIZE = 20;
  private static readonly MIN_PAGE_SIZE = 1;
  private static readonly MAX_PAGE_SIZE = 100;

  public readonly current: number;
  public readonly pageSize: number;

  constructor(queryParams: PaginationParams) {
    this.current = this.normalizeCurrent(queryParams.current);
    this.pageSize = this.normalizePageSize(queryParams.pageSize);
  }

  private normalizeCurrent(input?: unknown): number {
    const page = Number(input) || Pagination.DEFAULT_PAGE;
    return Math.max(Pagination.DEFAULT_PAGE, page);
  }

  private normalizePageSize(input?: unknown): number {
    const size = Number(input) || Pagination.DEFAULT_PAGE_SIZE;
    return Math.max(
      Pagination.MIN_PAGE_SIZE,
      Math.min(size, Pagination.MAX_PAGE_SIZE),
    );
  }

  public getResult<T>(items: T[], total: number): PaginationResult<T> {
    const totalPages = Math.ceil(total / this.pageSize);

    const meta: PaginationMeta = {
      current: this.current,
      pageSize: this.pageSize,
      totalItems: total,
      totalPages,
      hasNextPage: this.current < totalPages,
      hasPrevPage: this.current > 1,
    };

    return {
      items,
      meta,
    };
  }
}
