import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mockUsers } from '../../types/auth';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '../../lib/schemas/auth.schemas';

// ---------------------------------------------------------
// TODO: Thay thế mock bằng API thực tế khi backend sẵn sàng
// import { authApi } from '../../../services/api/authApi';
// ---------------------------------------------------------

export function useForgotPassword() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setServerError(null);

    try {
      // TODO: Thay thế đoạn mock dưới bằng API call thực tế:
      // await authApi.forgotPassword({ email: data.email });
      // setIsSuccess(true);

      // --- MOCK: Xóa khi tích hợp API ---
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!mockUsers.some((u) => u.email === data.email)) {
        setServerError('Email không tồn tại trong hệ thống');
        return;
      }
      // --- HẾT MOCK ---

      setIsSuccess(true);
    } catch {
      setServerError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return {
    form,
    serverError,
    isSuccess,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
