/**
 * ════════════════════════════════════════════════════════════════════════════
 * Auth Hooks Types
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Định nghĩa các kiểu cho auth-related hooks
 */

import type { UseFormReturn } from 'react-hook-form';
import type { LoginFormValues } from '@/lib/schemas/auth/login.schemas';
import type { RegisterFormValues } from '@/lib/schemas/auth/register.schemas';

/**
 * Return type cho useLogin hook
 */
export interface UseLoginReturn {
  /** Form instance từ React Hook Form */
  form: UseFormReturn<LoginFormValues>;
  /** Server error message (ví dụ: email/password sai, account locked) */
  serverError: string | null;
  /** Loading state khi API call đang chạy */
  isLoading: boolean;
  /** Submit handler được bind với form */
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

/**
 * Return type cho useRegister hook
 */
export interface UseRegisterReturn {
  /** Form instance từ React Hook Form */
  form: UseFormReturn<RegisterFormValues>;
  /** Server error message */
  serverError: string | null;
  /** Success state - true khi register thành công */
  isSuccess: boolean;
  /** Loading state khi API call đang chạy */
  isLoading: boolean;
  /** Submit handler được bind với form */
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

/**
 * Return type cho useVerifyEmail hook (nếu có)
 */
export interface UseVerifyEmailReturn {
  /** Server error message */
  serverError: string | null;
  /** Success state - true khi verify thành công */
  isSuccess: boolean;
  /** Loading state khi API call đang chạy */
  isLoading: boolean;
  /** Submit handler cho verification form */
  onSubmit: (token: string) => Promise<void>;
}
