import { useCallback, useReducer } from 'react';
import { type ApiError, type AsyncState, type AsyncAction } from '../../types/common';

/**
 * useApiMutation Hook
 * Hook để thực hiện mutations (POST, PUT, DELETE)
 * Thích hợp cho form submission, updates, deletes
 * 
 * Ví dụ:
 * const { mutate, isPending, error, isSuccess } = useApiMutation(
 *   (formData) => authApi.login(formData),
 *   { onSuccess: () => navigate('/dashboard') }
 * );
 * 
 * const handleSubmit = async (values) => {
 *   await mutate(values);
 * };
 */
interface UseMutationOptions<TData = unknown> {
  onSuccess?: (data: TData) => void;
  onError?: (error: ApiError) => void;
}

const initialState: AsyncState<unknown> = {
  data: null,
  error: null,
  isLoading: false,
  isSuccess: false,
};

function mutationReducer<T>(state: AsyncState<T>, action: AsyncAction<T>): AsyncState<T> {
  switch (action.type) {
    case 'PENDING':
      return { ...state, isLoading: true, error: null, isSuccess: false };
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

export function useApiMutation<V = unknown, TData = unknown>(
  mutationFn: (variables: V) => Promise<TData>,
  options: UseMutationOptions<TData> = {}
) {
  const { onSuccess, onError } = options;
  const [state, dispatch] = useReducer(mutationReducer, initialState);

  const mutate = useCallback(
    async (variables: V) => {
      dispatch({ type: 'PENDING' });
      try {
        const response = await mutationFn(variables);
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
    },
    [mutationFn, onSuccess, onError]
  );

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  return {
    mutate,
    data: state.data,
    error: state.error,
    isPending: state.isLoading,
    isSuccess: state.isSuccess,
    reset,
  };
}
