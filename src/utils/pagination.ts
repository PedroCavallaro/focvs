export interface PaginationDTO<T> {
  data: T[];
  page: number;
  totalPages: number;
  total: number;
}

export interface PaginationQuery {
  q?: string;
  page?: number;
  limit?: number;
  order?: "asc" | "desc";
  orderBy?: string;
}
