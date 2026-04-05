/**
 * ════════════════════════════════════════════════════════════════════════════
 * useVerifyMutation Hook
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Custom hook để quản lý email verification mutation với React Query
 * Tự động redirect sang login page khi xác thực thành công
 */

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { verifyEmailService } from '@/services/auth/verify';
import type { VerifyEmailRequest } from '@/lib/schemas/auth/verify-email.schemas';

export const useVerifyMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: VerifyEmailRequest) => {
      return verifyEmailService.verify(data);
    },
    onSuccess: () => {
      toast.success('Email xác thực thành công! Bạn có thể đăng nhập ngay.');
      // Auto-redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || 'Xác thực email thất bại. Vui lòng thử lại.';
      toast.error(message as string);
      console.error('❌ Verify email error:', error);
    },
  });
};
