export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
  statusCode?: number;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
  statusCode: number;
}
