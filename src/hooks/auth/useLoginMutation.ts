/**
 * ════════════════════════════════════════════════════════════════════════════
 * useLoginMutation Hook
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Custom hook để quản lý login mutation với React Query
 * Tự động lưu tokens vào auth store khi đăng nhập thành công
 * Sau đó fetch user profile để sync vào store
 */

import { useMutation } from '@tanstack/react-query';
import { loginService } from '@/services/auth/login';
import { getProfileService } from '@/services/get-profile';
import { useAuthStore } from '@/store/slices';
import type { LoginRequest } from '@/lib/schemas/auth/login.schemas';

export const useLoginMutation = () => {
  const { setTokens, setUser, setLoading } = useAuthStore();

  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      setLoading(true);
      return loginService.login(data);
    },
    onSuccess: async (response) => {
      // 1. Lưu tokens vào store
      if (response.data?.accessToken && response.data?.refreshToken) {
        setTokens(response.data.accessToken, response.data.refreshToken);
        
        // 2. Fetch user profile sau khi login thành công
        try {
          const profileResponse = await getProfileService.getProfile();
          if (profileResponse.data) {
            setUser(profileResponse.data);
          }
        } catch (profileError) {
          // Profile fetch failed, nhưng login vẫn thành công
          // User info sẽ được fetch lại khi vào dashboard
          console.warn('⚠️ Failed to fetch user profile after login:', profileError);
        }
      }
      setLoading(false);
    },
    onError: (error: Error | null) => {
      // Log error cho debugging
      console.error('❌ Login error:', error);
      setLoading(false);
    },
  });
};
