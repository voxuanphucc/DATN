import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginService } from '../../services/login';
import { useAuthStore } from '../../store/slices/authStore';
import { loginSchema, type LoginFormValues } from '../../lib/schemas/auth.schemas';

/**
 * useLogin Hook
 * Xử lý logic đăng nhập
 * - Validation form với React Hook Form + Zod
 * - Gọi API login
 * - Lưu user + tokens vào Zustand store (tự động persist vào localStorage)
 * - Xử lý lỗi và redirect
 */
export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await loginService.login({
        email: data.email,
        password: data.password,
      });

      if (response.success && response.data.user) {
        // Lưu user + tokens vào Zustand store
        // Zustand persist middleware sẽ tự động lưu vào localStorage
        const { user, token, refreshToken } = response.data;
        login(user, token, refreshToken);

        // Redirect đến dashboard
        navigate('/dashboard');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.error?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    serverError,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
