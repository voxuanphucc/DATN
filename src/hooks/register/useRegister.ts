import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormValues } from '../../lib/schemas/auth';
import { registerService } from '../../services/auth/register';

/**
 * useRegister Hook
 * Xử lý logic đăng ký tài khoản (Spec PB01)
 * - Validation form: fullName, email, password, confirmPassword
 * - Gọi registerService → tạo tài khoản pending
 * - Hệ thống gửi email xác thực (token 24h)
 */
export function useRegister() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    setIsLoading(true);

    try {
      // Use registerService instead of raw axios
      const response = await registerService.register({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      });
      if (response.success) {
        setIsSuccess(true);
      } else {
        setServerError(response.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch (error) {
      const axiosError = error as { 
        message?: string; 
        code?: string; 
        response?: { data?: { message?: string } } 
      };
      
      // Phân biệt timeout vs các lỗi khác
      const isTimeout = 
        axiosError.message?.includes('timeout') || 
        axiosError.code === 'ECONNABORTED';
      
      const errorMessage = isTimeout 
        ? 'Kết nối timed out. Server đang khởi động, vui lòng thử lại sau 1-2 phút.'
        : (axiosError.response?.data?.message || 
           axiosError.message || 
           'Đã có lỗi xảy ra. Vui lòng thử lại.');
      
      setServerError(errorMessage);
      console.error('❌ Lỗi đăng ký:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    serverError,
    isSuccess,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
