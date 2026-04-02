import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { mockUsers } from '../../types/auth';
import { loginSchema, type LoginFormValues } from '../../lib/schemas/auth.schemas';

// ---------------------------------------------------------
// TODO: Thay thế mock bằng API thực tế khi backend sẵn sàng
// import { authApi } from '../../../services/api/authApi';
// ---------------------------------------------------------

export function useLogin() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const isLocked = failedAttempts >= 5;

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);

    if (isLocked) {
      setServerError('Tài khoản bị khóa tạm thời do đăng nhập sai nhiều lần');
      return;
    }

    try {
      // TODO: Thay thế đoạn mock dưới bằng API call thực tế:
      // const response = await authApi.login({ email: data.email, password: data.password });
      // if (response.token) {
      //   localStorage.setItem('accessToken', response.token);
      //   navigate('/dashboard');
      // }

      // --- MOCK: Xóa khi tích hợp API ---
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const user = mockUsers.find((u) => u.email === data.email);

      if (!user || data.password !== 'Password123') {
        setFailedAttempts((prev) => prev + 1);
        setServerError('Email hoặc mật khẩu không đúng');
        return;
      }

      if (user.status === 'locked') {
        setServerError('Tài khoản bị khóa tạm thời do đăng nhập sai nhiều lần');
        return;
      }
      if (user.status === 'disabled') {
        setServerError('Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ quản trị hệ thống.');
        return;
      }
      if (user.status === 'pending') {
        setServerError('Tài khoản chưa được xác thực. Vui lòng kiểm tra email.');
        return;
      }
      // --- HẾT MOCK ---

      navigate('/dashboard');
    } catch {
      setServerError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return {
    form,
    serverError,
    isLocked,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
