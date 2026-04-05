import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { registerSchema, type RegisterFormValues } from '../../lib/schemas/auth.schemas';

/**
 * useRegister Hook
 * Xử lý logic đăng ký tài khoản (Spec PB01)
 * - Validation form: fullName, email, farmName (tùy chọn), password, confirmPassword
 * - Gọi API register → tạo tài khoản pending
 * - Hệ thống gửi email xác thực (token 24h)
 */
export function useRegister() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      farmName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        fullName: data.fullName,
        email: data.email,
        farmName: data.farmName || undefined,
        password: data.password,
      });

      const registerResponse = response.data;
      if (registerResponse.success) {
        setIsSuccess(true);
      } else {
        setServerError(registerResponse.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const msg =
          error.response?.data?.message ||
          error.response?.data?.error?.message;

        if (status === 409 || (msg && msg.toLowerCase().includes('email'))) {
          setServerError('Email đã được sử dụng. Vui lòng dùng email khác.');
        } else {
          setServerError(msg || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
      } else {
        setServerError(error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
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
