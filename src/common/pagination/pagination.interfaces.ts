export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationResult<T> {
  items: T[];
  meta: PaginationMeta;
}
