export interface PaginationDTO<T> {
    data: T[];
    page: number;
    totalPages: number;
    total: number;
  }