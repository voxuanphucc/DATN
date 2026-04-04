import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerService } from '../../services/register';
import { registerSchema, type RegisterFormValues } from '../../lib/schemas/auth.schemas';

/**
 * useRegister Hook
 * Xử lý logic đăng ký tài khoản
 * - Validation form với React Hook Form + Zod
 * - Gọi API register
 * - Xử lý lỗi (email trùng, etc.)
 * - Chuyển hướng sang email verification
 */
export function useRegister() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await registerService.register({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        farmName: data.farmName,
      });

      if (response.success) {
        setIsSuccess(true);
        setRegisteredEmail(data.email);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    serverError,
    isSuccess,
    isLoading,
    registeredEmail,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
