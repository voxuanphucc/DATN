import { type ApiError } from '../../types';

/**
 * Error Handling Utilities
 * Chuẩn hóa xử lý lỗi từ API
 */

/**
 * Extract error message từ API response
 */
export const getErrorMessage = (error: unknown): string => {
  if ((error as Record<string, unknown>)?.response?.data?.error?.message) {
    return (error as Record<string, unknown>)?.response?.data?.error?.message as string;
  }

  if ((error as Record<string, unknown>)?.message) {
    return (error as Record<string, unknown>)?.message as string;
  }

  return 'Đã có lỗi xảy ra. Vui lòng thử lại.';
};

/**
 * Parse API error thành object
 */
export const parseApiError = (error: unknown): ApiError => {
  const statusCode = (error as Record<string, unknown>)?.response?.status as number || 500;
  const errorData = (error as Record<string, unknown>)?.response?.data?.error;

  return {
    code: (errorData as Record<string, unknown>)?.code as string || 'UNKNOWN_ERROR',
    message: (errorData as Record<string, unknown>)?.message as string || getErrorMessage(error),
    statusCode,
    details: (errorData as Record<string, unknown>)?.details,
    timestamp: (errorData as Record<string, unknown>)?.timestamp as string || new Date().toISOString(),
  };
};

/**
 * Check nếu là lỗi network
 */
export const isNetworkError = (error: unknown): boolean => {
  return !(error as Record<string, unknown>)?.response || (error as Record<string, unknown>)?.code === 'ECONNABORTED';
};

/**
 * Check nếu là lỗi authentication (401)
 */
export const isAuthenticationError = (error: unknown): boolean => {
  return (error as Record<string, unknown>)?.response?.status === 401;
};

/**
 * Check nếu là lỗi authorization (403)
 */
export const isAuthorizationError = (error: unknown): boolean => {
  return (error as Record<string, unknown>)?.response?.status === 403;
};

/**
 * Check nếu là lỗi not found (404)
 */
export const isNotFoundError = (error: unknown): boolean => {
  return (error as Record<string, unknown>)?.response?.status === 404;
};

/**
 * Check nếu là lỗi validation (400)
 */
export const isValidationError = (error: unknown): boolean => {
  return (error as Record<string, unknown>)?.response?.status === 400;
};

/**
 * Check nếu là lỗi server (500+)
 */
export const isServerError = (error: unknown): boolean => {
  const status = (error as Record<string, unknown>)?.response?.status;
  return status && (status as number) >= 500;
};
