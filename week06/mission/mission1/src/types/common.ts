export type CommonResponse<T> = {
  status: boolean;
  message: string;
  data: T;
  statusCode: number;
};

export type CursorBasedResponse<T> = {
  status: boolean;
  message: string;
  data: T;
  statusCode: number;
  hasNext: boolean;
  nextCursor: number;
};

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: "asc" | "desc";
};
