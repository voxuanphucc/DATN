import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { toast } from 'sonner';
import { useLoginMutation } from '../auth/useLoginMutation';
import { loginSchema, type LoginFormValues } from '../../lib/schemas/auth';
import type { UseLoginReturn } from '../auth/auth.types';
import { getRoleFromToken } from '../../utils/jwt';

interface LoginAttempt {
  email: string;
  timestamp: number;
}

const FAILED_ATTEMPTS_LIMIT = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 phút
const STORAGE_KEY = 'login_attempts';

export function useLogin(): UseLoginReturn {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  
  // Use React Query mutation hook
  const { mutate: performLogin, isPending } = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // ─── Lockout helpers ────────────────────────────────────────────────────────

  const getLoginAttempts = (email: string): LoginAttempt[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      const attempts: LoginAttempt[] = JSON.parse(stored);
      const now = Date.now();
      return attempts.filter(
        (a) => a.email === email && now - a.timestamp < LOCKOUT_DURATION,
      );
    } catch {
      return [];
    }
  };

  const recordFailedAttempt = (email: string): number => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const attempts: LoginAttempt[] = stored ? JSON.parse(stored) : [];
      const now = Date.now();
      const recent = attempts.filter((a) => now - a.timestamp < LOCKOUT_DURATION);
      recent.push({ email, timestamp: now });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recent));
      return recent.filter((a) => a.email === email).length;
    } catch {
      return 1;
    }
  };

  const clearFailedAttempts = (email: string) => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const attempts: LoginAttempt[] = JSON.parse(stored);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(attempts.filter((a) => a.email !== email)),
      );
    } catch {
      // ignore
    }
  };

  // ─── Submit ─────────────────────────────────────────────────────────────────

  const onSubmit = (data: LoginFormValues) => {
    setServerError(null);

    // Kiểm tra lockout client-side trước (Spec PB02)
    const recentAttempts = getLoginAttempts(data.email);
    if (recentAttempts.length >= FAILED_ATTEMPTS_LIMIT) {
      const oldestAttempt = recentAttempts[0].timestamp;
      const lockedUntil = oldestAttempt + LOCKOUT_DURATION;
      if (Date.now() < lockedUntil) {
        const minutesLeft = Math.ceil((lockedUntil - Date.now()) / 60000);
        const lockoutMsg = `Tài khoản bị khóa tạm thời do đăng nhập sai nhiều lần. Vui lòng thử lại sau ${minutesLeft} phút.`;
        setServerError(lockoutMsg);
        toast.error(lockoutMsg);
        return;
      } else {
        clearFailedAttempts(data.email);
      }
    }

    // Call login mutation with error handling
    performLogin(data, {
      onSuccess: (response) => {
        clearFailedAttempts(data.email);
        // Tokens auto-saved by useLoginMutation via setTokens()
        
        toast.success('Đăng nhập thành công!');
        
        // Get role from access token to determine redirect
        const accessToken = response.data?.accessToken;
        if (accessToken) {
          const role = getRoleFromToken(accessToken);
          
          // Redirect based on role
          if (role === 'employee') {
            navigate('/tasks');
          } else {
            navigate('/dashboard');
          }
        } else {
 
          navigate('/dashboard');
        }
      },
      onError: (error: Error | null) => {
        if (!error || !axios.isAxiosError(error)) {
          const msg = 'Đã có lỗi xảy ra. Vui lòng thử lại.';
          setServerError(msg);
          toast.error(msg);
          return;
        }

        const status = error.response?.status;
        const msg = error.response?.data?.message || error.response?.data?.error?.message;
        
        // Detect timeout errors
        const isTimeout = error.message?.includes('timeout') || error.code === 'ECONNABORTED';
        
        let errorMsg = '';
        
        if (isTimeout) {
          errorMsg = 'Kết nối timed out. Server đang khởi động, vui lòng thử lại sau 1-2 phút.';
        } else if (status === 401) {
          const failedCount = recordFailedAttempt(data.email);
          if (failedCount >= FAILED_ATTEMPTS_LIMIT) {
            errorMsg = 'Tài khoản bị khóa tạm thời (5 lần sai liên tiếp). Vui lòng thử lại sau 15 phút.';
          } else {
            errorMsg = 'Email hoặc mật khẩu không đúng.';
          }
        } else if (status === 403) {
          errorMsg = 'Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ quản trị hệ thống.';
        } else if (status === 423) {
          errorMsg = 'Tài khoản bị khóa tạm thời do đăng nhập sai nhiều lần. Vui lòng thử lại sau.';
        } else {
          recordFailedAttempt(data.email);
          errorMsg = msg || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
        }
        
        setServerError(errorMsg);
        toast.error(errorMsg);
        console.error('Lỗi đăng nhập:', error);
      },
    });
  };

  return {
    form,
    serverError,
    isLoading: isPending,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
