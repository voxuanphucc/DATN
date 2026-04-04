import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordService } from '../../services/forgot-password';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../../lib/schemas/auth.schemas';

/**
 * useForgotPassword Hook
 * Xử lý logic quên mật khẩu
 * - Gửi yêu cầu reset password tới API
 * - Xử lý errors
 * - Redirect sang email verification
 */
export function useForgotPassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const response = await forgotPasswordService.forgotPassword({
        email: data.email,
      });

      if (response.success) {
        setIsSuccess(true);
        setResetEmail(data.email);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message ||
        'Đã có lỗi xảy ra. Vui lòng kiểm tra email của bạn.';
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
    resetEmail,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
