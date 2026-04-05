/**
 * ════════════════════════════════════════════════════════════════════════════
 * useLoginMutation Hook
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Custom hook để quản lý login mutation với React Query
 * Tự động lưu tokens vào auth store khi đăng nhập thành công
 */

import { useMutation } from '@tanstack/react-query';
import { loginService } from '@/services/auth/login';
import { useAuthStore } from '@/store/slices';
import type { LoginRequest } from '@/lib/schemas/auth/login.schemas';

export const useLoginMutation = () => {
  const { setTokens } = useAuthStore();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      return loginService.login(data);
    },
    onSuccess: (response) => {
      // Sử dụng setTokens method thay vì setState
      if (response.data?.accessToken && response.data?.refreshToken) {
        setTokens(response.data.accessToken, response.data.refreshToken);
      }
    },
    onError: (error: Error | null) => {
      // Log error cho debugging
      console.error('❌ Login error:', error);
    },
  });
};
