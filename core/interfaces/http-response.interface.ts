
export interface ApiResponse<T> {
  status: string;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  timestamp: string;
  status: number;
  code: string;
  message: string;
  path: string;
  errors: unknown[];
}
