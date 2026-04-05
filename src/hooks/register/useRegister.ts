import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRegisterMutation } from '../auth/useRegisterMutation';
import { registerSchema, type RegisterFormValues } from '../../lib/schemas/auth';

/**
 * useRegister Hook
 * Xử lý logic đăng ký tài khoản (Spec PB01)
 * - Validation form: fullName, email, password, confirmPassword
 * - Gọi registerService thông qua useRegisterMutation (React Query)
 * - Hệ thống gửi email xác thực (token 24h)
 */
export function useRegister() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Use React Query mutation hook
  const { mutate: register, isPending } = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    setServerError(null);
    setIsSuccess(false);

    register(
      {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (error) => {
          // Phân biệt timeout vs các lỗi khác
          const axiosError = error as {
            message?: string;
            code?: string;
            response?: { data?: { message?: string } };
          };

          const isTimeout =
            axiosError.message?.includes('timeout') ||
            axiosError.code === 'ECONNABORTED';

          const errorMessage = isTimeout
            ? 'Kết nối timed out. Server đang khởi động, vui lòng thử lại sau 1-2 phút.'
            : axiosError.response?.data?.message ||
              axiosError.message ||
              'Đã có lỗi xảy ra. Vui lòng thử lại.';

          setServerError(errorMessage);
          console.error('❌ Lỗi đăng ký:', error);
        },
      }
    );
  };

  return {
    form,
    serverError,
    isSuccess,
    isLoading: isPending,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
