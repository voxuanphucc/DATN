import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema, type ChangePasswordFormValues } from '../../lib/schemas/auth.schemas';

/**
 * useChangePassword Hook
 * Xử lý logic đổi mật khẩu when 登録
 * - Validation form
 * - Kiểm tra mật khẩu hiện tại đúng
 * - Kiểm tra mật khẩu mới khác cũ
 * - Mật khẩu mới hợp lệ
 */
export function useChangePassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    setServerError(null);

    try {
      // Mock API call - will be replaced with real API
      // In real app, verify current password with backend
      const currentPasswordCorrect = true; // Mock check
      
      if (!currentPasswordCorrect) {
        setServerError('Mật khẩu hiện tại không đúng');
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success
      setIsSuccess(true);

      // Optional: Auto-logout or require re-login
      // window.location.href = '/login';
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      setServerError(errorMessage);
    }
  };

  return {
    form,
    serverError,
    isSuccess,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
