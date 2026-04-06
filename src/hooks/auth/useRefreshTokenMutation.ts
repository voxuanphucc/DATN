/**
 * ════════════════════════════════════════════════════════════════════════════
 * useRefreshTokenMutation Hook
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Custom hook để quản lý token refresh mutation với React Query
 * Tự động cập nhật access token + refresh token trong Zustand store
 * 
 * @example
 * const { mutate: refreshToken } = useRefreshTokenMutation();
 * refreshToken(currentRefreshToken);
 */

import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/slices';
import { refreshTokenService } from '@/services/auth/refresh';
import type { LoginData } from '@/lib/schemas/auth/login.schemas';

export const useRefreshTokenMutation = () => {
  const { setAccessToken, setRefreshToken } = useAuthStore();

  return useMutation({
    mutationFn: async (refreshToken: string) => {
      return refreshTokenService.refresh({ refreshToken });
    },
    onSuccess: (response) => {
      // Extract tokens từ response
      if (response.data) {
        const tokens = response.data as unknown as LoginData;
        if (tokens.accessToken && tokens.refreshToken) {
          // Cập nhật tokens vào store
          setAccessToken(tokens.accessToken);
          setRefreshToken(tokens.refreshToken);
          console.log('✅ Token refreshed successfully');
        }
      }
    },
    onError: (error: Error) => {
      console.error('❌ Token refresh error:', error);
      // Logout sẽ được xử lý bởi axios interceptor
    },
  });
};
