import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordService } from '../../services/reset-password';
import { resetPasswordSchema, type ResetPasswordFormValues } from '../../lib/schemas/auth';

/**
 * useResetPassword Hook
 * Xử lý logic reset password sau khi nhân được link từ email
 * - Validate token từ URL
 * - Submit form reset password
 * - Redirect đến login sau thành công
 */
export function useResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isTokenValid = Boolean(token);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setServerError(null);

    if (!isTokenValid || !token) {
      setServerError('Token không hợp lệ hoặc đã hết hạn');
      return;
    }

    setIsLoading(true);

    try {
      const response = await resetPasswordService.resetPassword({
        token,
        newPassword: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (response.success) {
        setIsSuccess(true);
        // Redirect đến login sau 2 giây
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage = (error as any).response?.data?.error?.message ||
        'Đã có lỗi xảy ra. Token có thể đã hết hạn. Vui lòng yêu cầu link mới.';
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
    isTokenValid,
    token,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
