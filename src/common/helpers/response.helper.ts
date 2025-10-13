import { ApiResponse } from '../interfaces/api-response.interface';

export class ResponseHelper {
  static success<T>(data: T, count?: number, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      count: count ?? (Array.isArray(data) ? data.length : undefined),
      message
    };
  }

  static successWithCount<T>(data: T[], message?: string): ApiResponse<T[]> {
    return {
      success: true,
      data,
      count: data.length,
      message
    };
  }

  static successSingle<T>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message
    };
  }

  static error<T>(message: string, statusCode?: number): ApiResponse<T> {
    return {
      success: false,
      data: null as T,
      message,
      statusCode
    };
  }
}
