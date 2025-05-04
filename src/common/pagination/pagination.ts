import {
  PaginationParams,
  PaginationResult,
  PaginationMeta,
} from './pagination.interfaces';

export class Pagination {
  public readonly page: number;

  public readonly limit: number;

  public readonly offset: number;

  constructor(queryParams: PaginationParams) {
    this.page = Math.max(1, Number(queryParams.page) || 1);

    this.limit = Math.max(1, Number(queryParams.limit) || 20);

    this.offset = (this.page - 1) * this.limit;
  }

  public getResult<T>(items: T[], total: number): PaginationResult<T> {
    const totalPages = Math.ceil(total / this.limit);

    const meta: PaginationMeta = {
      currentPage: this.page,
      itemsPerPage: this.limit,
      totalItems: total,
      totalPages,
    };

    return {
      items,
      meta,
    };
  }
}
