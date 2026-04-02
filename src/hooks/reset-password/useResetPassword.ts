import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormValues } from '../../lib/schemas/auth.schemas';

// ---------------------------------------------------------
// TODO: Thay thế mock bằng API thực tế khi backend sẵn sàng
// import { authApi } from '../../../services/api/authApi';
// ---------------------------------------------------------

export function useResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // TODO: Trong thực tế, validate token với backend khi mount component
  // Hiện tại giả định token hợp lệ nếu có trong URL
  const isTokenValid = Boolean(token);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (_data: ResetPasswordFormValues) => {
    setServerError(null);

    if (!isTokenValid) {
      setServerError('Token không hợp lệ hoặc đã hết hạn');
      return;
    }

    try {
      // TODO: Thay thế đoạn mock dưới bằng API call thực tế:
      // await authApi.resetPassword({ token, newPassword: data.password });
      // setIsSuccess(true);
      // setTimeout(() => navigate('/login'), 3000);

      // --- MOCK: Xóa khi tích hợp API ---
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // --- HẾT MOCK ---

      setIsSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch {
      setServerError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return {
    form,
    serverError,
    isSuccess,
    isTokenValid,
    token,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
