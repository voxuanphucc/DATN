import { useFetch } from '../common/useFetch';
import { getMembersService } from '../../services/get-members';
import { type PaginationParams } from '../../types/common';

/**
 * useGetMembers Hook
 * Fetch danh sách thành viên của trang trại
 * - Tự động gọi API khi component mount
 * - Hỗ trợ refetch và retry
 */
export function useGetMembers(params?: PaginationParams) {
  const { data, error, isLoading, refetch } = useFetch(
    () => getMembersService.getMembers(params),
    [params?.page, params?.limit],
    { retry: true, retryCount: 3 }
  );

  return {
    members: data?.members || [],
    total: data?.total || 0,
    error,
    isLoading,
    refetch,
  };
}
