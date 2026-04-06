/**
 * ════════════════════════════════════════════════════════════════════════════
 * useLoginMutation Hook
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Custom hook để quản lý login mutation với React Query
 * Chỉ lưu tokens vào auth store khi đăng nhập thành công
 * User info sẽ được lấy từ JWT token hoặc fetch riêng nếu cần
 */

import { useMutation } from '@tanstack/react-query';
import { loginService } from '@/services/auth/login';
import { useAuthStore } from '@/store/slices';
import type { LoginRequest } from '@/lib/schemas/auth/login.schemas';

export const useLoginMutation = () => {
  const { setTokens, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      setLoading(true);
      return loginService.login(data);
    },
    onSuccess: (response) => {
      // Lưu tokens vào store (tự động persist vào localStorage)
      if (response.data?.accessToken && response.data?.refreshToken) {
        setTokens(response.data.accessToken, response.data.refreshToken);
      }
      setLoading(false);
    },
    onError: (error: Error | null) => {
      console.error('❌ Login error:', error);
      setLoading(false);
    },
  });
};
