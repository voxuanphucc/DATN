

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
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

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || 'Xác thực email thất bại. Vui lòng thử lại.'
        : 'Xác thực email thất bại. Vui lòng thử lại.';
      toast.error(message);
      console.error(' Verify email error:', error);
    },
  });
};
