import { useCallback, useReducer } from 'react';
import { type ApiError, type AsyncState, type AsyncAction } from '../../types/common';

/**
 * useAsync Hook
 * Quản lý async operations (API calls, async functions)
 * Tự động xử lý loading, error, data states
 * 
 * Ví dụ:
 * const { data, isLoading, error, execute } = useAsync(
 *   () => userApi.getProfile(),
 *   { autoExecute: true }
 * );
 */
interface UseAsyncOptions<TData = unknown> {
  autoExecute?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: ApiError) => void;
}

const initialState: AsyncState<unknown> = {
  data: null,
  error: null,
  isLoading: false,
  isSuccess: false,
};

function asyncReducer<T>(state: AsyncState<T>, action: AsyncAction<T>): AsyncState<T> {
  switch (action.type) {
    case 'PENDING':
      return { data: null, error: null, isLoading: true, isSuccess: false };
    case 'SUCCESS':
      return { data: action.payload || null, error: null, isLoading: false, isSuccess: true };
    case 'ERROR':
      return { data: null, error: action.payload as ApiError, isLoading: false, isSuccess: false };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function useAsync<TData = unknown>(
  asyncFunction: () => Promise<TData>,
  options: UseAsyncOptions<TData> = {}
) {
  const { autoExecute = false, onSuccess, onError } = options;
  const [state, dispatch] = useReducer(asyncReducer, initialState);

  const execute = useCallback(async () => {
    dispatch({ type: 'PENDING' });
    try {
      const response = await asyncFunction();
      const result = response.data || response;
      dispatch({ type: 'SUCCESS', payload: result });
      onSuccess?.(result);
      return result;
    } catch (error: unknown) {
      const apiError: ApiError = {
        code: (error as Record<string, unknown>)?.response?.data?.error?.code || 'UNKNOWN_ERROR',
        message: (error as Record<string, unknown>)?.response?.data?.error?.message || (error as Record<string, unknown>)?.message || 'Đã có lỗi xảy ra',
        statusCode: (error as Record<string, unknown>)?.response?.status || 500,
        details: (error as Record<string, unknown>)?.response?.data?.error?.details,
      };
      dispatch({ type: 'ERROR', payload: apiError });
      onError?.(apiError);
      throw apiError;
    }
  }, [asyncFunction, onSuccess, onError]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  // Auto execute nếu được yêu cầu
  if (autoExecute && !state.isLoading && !state.isSuccess && !state.error) {
    // Sử dụng useEffect sẽ tự động được gọi ở component level
  }

  return {
    ...state,
    execute,
    reset,
  };
}
