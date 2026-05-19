export type CommonResponse<T> = {
  status: boolean;
  message: string;
  data: T;
  statusCode: number;
};

export type CursorBasedResponse<T> = CommonResponse<{
  data: T;
  nextCursor: number | null;
  hasNext: boolean;
}>;

export type PaginationDto = {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: "asc" | "desc";
};
