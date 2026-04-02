import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mockUsers } from '../../types/auth';
import { registerSchema, type RegisterFormValues } from '../../lib/schemas/auth.schemas';

// ---------------------------------------------------------
// TODO: Thay thế mock bằng API thực tế khi backend sẵn sàng
// import { authApi } from '../../../services/api/authApi';
// ---------------------------------------------------------

export function useRegister() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);

    try {
      // TODO: Thay thế đoạn mock dưới bằng API call thực tế:
      // const response = await authApi.register({
      //   fullName: data.fullName,
      //   email: data.email,
      //   password: data.password,
      //   farmName: data.farmName,
      // });
      // setIsSuccess(true);

      // --- MOCK: Xóa khi tích hợp API ---
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (mockUsers.some((u) => u.email === data.email)) {
        setServerError('Email đã được sử dụng');
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
