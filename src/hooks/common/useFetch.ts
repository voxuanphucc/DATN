import { useEffect } from 'react';
import { useAsync } from './useAsync';

/**
 * useFetch Hook
 * Hook để fetch dữ liệu tự động khi component mount
 * 
 * Ví dụ:
 * const { data: members, isLoading, error } = useFetch(
 *   () => teamApi.getMembers(),
 *   [teamId],
 *   { retry: true }
 * );
 */
interface UseFetchOptions<TData = unknown> {
  onSuccess?: (data: TData) => void;
  onError?: (error: unknown) => void;
  retry?: boolean;
  retryCount?: number;
}

export function useFetch<TData = unknown>(
  asyncFunction: () => Promise<TData>,
  dependencies: readonly unknown[] = [],
  options: UseFetchOptions<TData> = {}
) {
  const { onSuccess, onError, retry = true, retryCount = 3 } = options;
  const { data, error, isLoading, isSuccess, execute, reset } = useAsync(asyncFunction, {
    onSuccess,
    onError,
  });

  useEffect(() => {
    let isMounted = true;
    let attempts = 0;

    const fetchData = async () => {
      try {
        await execute();
      } catch (err) {
        if (isMounted && retry && attempts < retryCount) {
          attempts++;
          // Retry sau 1 giây
          setTimeout(() => {
            if (isMounted) fetchData();
          }, 1000);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, error, isLoading, isSuccess, refetch: execute, reset };
}
