

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { registerService } from '@/services/auth/register';
import type { RegisterRequest } from '@/lib/schemas/auth/register.schemas';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      return registerService.register(data);
    },
    onSuccess: (response) => {
      console.log('✅ Register success:', response.message);
      toast.success(response.message || 'Đăng ký thành công! Vui lòng kiểm tra email để xác thực.');
    },
    onError: (error: AxiosError) => {
      console.error('❌ Register error:', error);
      const message = error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.';
      toast.error(message as string);
    },
  });
};
