import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useAuthStore } from '../../store/slices/authStore';
import { loginSchema, type LoginFormValues } from '../../lib/schemas/auth.schemas';

interface LoginAttempt {
  email: string;
  timestamp: number;
}

const FAILED_ATTEMPTS_LIMIT = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 phút
const STORAGE_KEY = 'login_attempts';

/**
 * useLogin Hook
 * Xử lý logic đăng nhập (Spec PB02)
 * - Validation form
 * - Track failed login attempts per email
 * - Lock tài khoản sau 5 lần sai trong 15 phút
 * - Lưu user + tokens vào Zustand store
 * - Redirect theo role:
 *   owner    → /dashboard (trang quản lý trang trại)
 *   manager  → /dashboard (bảng điều khiển quản lý)
 *   employee → /tasks (danh sách công việc)
 */
export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    setIsLoading(true);

    try {
      // Kiểm tra lockout client-side trước (Spec PB02)
      const recentAttempts = getLoginAttempts(data.email);
      if (recentAttempts.length >= FAILED_ATTEMPTS_LIMIT) {
        const oldestAttempt = recentAttempts[0].timestamp;
        const lockedUntil = oldestAttempt + LOCKOUT_DURATION;
        if (Date.now() < lockedUntil) {
          const minutesLeft = Math.ceil((lockedUntil - Date.now()) / 60000);
          setServerError(
            `Tài khoản bị khóa tạm thời do đăng nhập sai nhiều lần. Vui lòng thử lại sau ${minutesLeft} phút.`,
          );
          setIsLoading(false);
          return;
        } else {
          clearFailedAttempts(data.email);
        }
      }

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: data.email,
        password: data.password,
      });

      const loginResponse = response.data;

      if (loginResponse.success && loginResponse.data?.user) {
        clearFailedAttempts(data.email);
        const { user, accessToken, refreshToken } = loginResponse.data;

        // Kiểm tra trạng thái tài khoản (Spec PB02)
        if (user.status === 'pending') {
          setServerError(
            'Tài khoản chưa được xác thực email. Vui lòng kiểm tra hộp thư và click vào link xác thực.',
          );
          setIsLoading(false);
          return;
        }

        if (user.status === 'locked' || user.status === 'disabled') {
          setServerError(
            'Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ quản trị hệ thống.',
          );
          setIsLoading(false);
          return;
        }

        login(user, accessToken, refreshToken);

        // Redirect theo role (Spec PB02, US02)
        // owner    → /dashboard (Nông dân → trang quản lý trang trại)
        // manager  → /dashboard (Quản lý → bảng điều khiển quản lý)
        // employee → /tasks     (Nhân viên → danh sách công việc)
        if (user.role === 'employee') {
          navigate('/tasks');
        } else {
          navigate('/dashboard');
        }
      } else {
        const failedCount = recordFailedAttempt(data.email);
        if (failedCount >= FAILED_ATTEMPTS_LIMIT) {
          setServerError(
            'Tài khoản bị khóa tạm thời (5 lần sai liên tiếp). Vui lòng thử lại sau 15 phút.',
          );
        } else {
          const remaining = FAILED_ATTEMPTS_LIMIT - failedCount;
          setServerError(
            `Email hoặc mật khẩu không đúng. Còn ${remaining} lần thử.`,
          );
        }
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const msg =
          error.response?.data?.message ||
          error.response?.data?.error?.message;

        if (status === 401) {
          const failedCount = recordFailedAttempt(data.email);
          if (failedCount >= FAILED_ATTEMPTS_LIMIT) {
            setServerError(
              'Tài khoản bị khóa tạm thời (5 lần sai liên tiếp). Vui lòng thử lại sau 15 phút.',
            );
          } else {
            setServerError('Email hoặc mật khẩu không đúng.');
          }
        } else if (status === 403) {
          setServerError(
            'Tài khoản của bạn đã bị vô hiệu hóa. Vui lòng liên hệ quản trị hệ thống.',
          );
        } else if (status === 423) {
          setServerError(
            'Tài khoản bị khóa tạm thời do đăng nhập sai nhiều lần. Vui lòng thử lại sau.',
          );
        } else {
          recordFailedAttempt(data.email);
          setServerError(msg || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
      } else {
        setServerError(error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
      console.error('❌ Lỗi đăng nhập:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    serverError,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
