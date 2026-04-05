import { useFetch } from '../common/useFetch';
import { getInvitationsService } from '../../services/get-invitations';
import { type PaginationParams } from '../../types';

/**
 * useGetInvitations Hook
 * Fetch danh sách lời mời đang chờ
 * - Tự động gọi API khi component mount
 * - Hỗ trợ refetch
 */
export function useGetInvitations(params?: PaginationParams) {
  const { data, error, isLoading, refetch } = useFetch(
    () => getInvitationsService.getInvitations(params),
    [params?.page, params?.limit],
    { retry: true, retryCount: 3 }
  );

  return {
    invitations: data?.invitations || [],
    total: data?.total || 0,
    error,
    isLoading,
    refetch,
  };
}
