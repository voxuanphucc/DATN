import { useEffect } from 'react';
import { useFetch } from '../common/useFetch';
import { useAuthStore } from '../../store/slices/authStore';
import { getProfileService } from '../../services/get-profile';

/**
 * useGetProfile Hook
 * Fetch current user profile & sync with authStore
 * - Tự động gọi khi component mount
 * - Cập nhật user vào authStore khi fetch thành công
 * - Retry nếu lỗi
 */
export function useGetProfile() {
  const { data, error, isLoading, refetch } = useFetch(
    () => getProfileService.getProfile(),
    [],
    { retry: true, retryCount: 3 }
  );

  const { setUser } = useAuthStore();

  // Đồng bộ user profile vào store khi fetch thành công
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return {
    user: data || null,
    error,
    isLoading,
    refetch,
  };
}
