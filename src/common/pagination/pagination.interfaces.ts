export interface PaginationParams {
  current?: number;
  pageSize?: number;
}

export interface PaginationMeta {
  current: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginationResult<T> {
  items: T[];
  meta: PaginationMeta;
}
