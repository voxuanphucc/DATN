# Authentication Implementation Guide

## Architecture Overview

```
Auth Flow:
┌──────────────────┐
│   Register.tsx   │
│   (Email + Pass) │
└────────┬────────┘
         │
         ↓
┌──────────────────────────────┐
│  RegisterService.register()  │
│  - Validate with Zod         │
│  - POST /auth/register       │
│  - Validate response         │
└────────┬────────────────────┘
         │
         ↓
┌──────────────────────────┐
│  Return { data: User }   │ → useRegisterMutation()
└────────┬────────────────┘
         │
         ↓
┌──────────────────────────────────┐
│ useAuthStore.setUser()           │
│ store tokens in localStorage ✓  │
└────────┬────────────────────────┘
         │
         ↓
    Redirect to verify email page
```

## File Organization

```
src/
├── lib/schemas/auth/
│   ├── base.schemas.ts          # ApiResponse, error base types
│   ├── login.schemas.ts         # LoginRequestSchema, LoginResponseSchema
│   ├── register.schemas.ts      # RegisterRequestSchema, RegisterResponseSchema
│   ├── verify-email.schemas.ts
│   ├── refresh-token.schemas.ts
│   └── index.ts                 # Central export
├── services/auth/
│   ├── base.ts                  # axiosInstance, ApiResponse class
│   ├── login.ts                 # LoginService
│   ├── register.ts              # RegisterService
│   ├── verify.ts
│   └── index.ts
├── hooks/auth/
│   ├── useLoginMutation.ts      # React Query mutation
│   ├── useLogin.ts              # Local state + lockout tracking
│   ├── useRegisterMutation.ts   # React Query mutation
│   └── index.ts
├── store/slices/
│   └── authStore.ts             # Zustand persistent store
└── types/auth/
    ├── index.ts
    └── ...
```

## Registration Flow

### Step 1: Register RequestSchema (Zod)
```typescript
// lib/schemas/auth/register.schemas.ts
import { z } from 'zod';
import { ApiResponseSchema } from './base.schemas';

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

export const RegisterRequestSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string()
    .min(8, 'Mật khẩu ≥ 8 ký tự')
    .regex(PASSWORD_REGEX, 'Mật khẩu phải chứa chữ hoa + số'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
});

export const RegisterResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  status: z.enum(['pending', 'active']),
});

export const RegisterApiResponseSchema = ApiResponseSchema.extend({
  data: RegisterResponseSchema,
});

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
```

### Step 2: Service (Validation + API Call)
```typescript
// services/auth/register.ts
import { apiClient } from '../base';
import {
  RegisterRequestSchema,
  RegisterApiResponseSchema,
  type RegisterRequest,
  type RegisterResponse,
} from '@/lib/schemas/auth';

export class RegisterService {
  async register(data: RegisterRequest): Promise<{ data: RegisterResponse }> {
    // Validate input
    const validatedInput = RegisterRequestSchema.parse(data);

    // API call
    const response = await apiClient.post<{ data: RegisterResponse }>(
      '/auth/register',
      validatedInput
    );

    // Validate response
    const validated = RegisterApiResponseSchema.parse(response.data);

    return { data: validated.data };
  }
}

export const registerService = new RegisterService();
```

### Step 3: React Query Hook
```typescript
// hooks/auth/useRegisterMutation.ts
import { useMutation } from '@tanstack/react-query';
import { registerService } from '@/services/auth';
import { useAuthStore } from '@/store';
import type { RegisterRequest } from '@/lib/schemas/auth';

export const useRegisterMutation = () => {
  const setUser = useAuthStore(state => state.setUser);

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const { data: response } = await registerService.register(data);
      return response;
    },
    onSuccess: (response) => {
      // Store user info (but not tokens, since pending email verification)
      setUser({
        id: response.id,
        email: response.email,
        role: null, // Not assigned yet
        status: response.status,
      });
      // Navigation handled by page component
    },
    onError: (error) => {
      // Handled by component
      console.error('Register error:', error);
    },
  });
};
```

### Step 4: Component
```typescript
// pages/auth/Register.tsx or components/auth/RegisterForm.tsx
import { useRegisterMutation } from '@/hooks/auth';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/components/forms/auth';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutate: register, isPending, error } = useRegisterMutation();

  const handleRegister = (data: RegisterRequest) => {
    register(data, {
      onSuccess: () => {
        navigate('/verify-email');
      },
    });
  };

  return (
    <RegisterForm
      onSubmit={handleRegister}
      isLoading={isPending}
      error={error?.message}
    />
  );
};
```

## Login Flow & Error Handling

### Step 1: Login Request Schema
```typescript
// lib/schemas/auth/login.schemas.ts
export const LoginRequestSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Mật khẩu bắt buộc'),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    role: z.enum(['ADMIN', 'FARM_OWNER', 'FARM_MANAGER', 'EMPLOYEE']),
    status: z.enum(['active', 'pending', 'locked', 'disabled']),
  }),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
```

### Step 2: Service with Error Handling
```typescript
// services/auth/login.ts
export class LoginService {
  async login(data: LoginRequest): Promise<{ data: LoginResponse }> {
    const validatedInput = LoginRequestSchema.parse(data);

    try {
      const response = await apiClient.post<LoginResponse>(
        '/auth/login',
        validatedInput
      );
      const validated = LoginResponseSchema.parse(response.data);
      return { data: validated };
    } catch (error) {
      // Timeout handling
      const isTimeout = 
        error.message?.includes('timeout') || 
        error.code === 'ECONNABORTED';
      
      if (isTimeout) {
        throw new Error('Kết nối timeout. Vui lòng thử lại.');
      }

      // Network error
      if (error.message === 'Network Error') {
        throw new Error('Lỗi kết nối mạng. Kiểm tra internet của bạn.');
      }

      // API error (401, 403, etc.)
      if (error.response?.status === 401) {
        throw new Error('Email hoặc mật khẩu không đúng.');
      }

      if (error.response?.status === 429) {
        throw new Error('Quá nhiều lần đăng nhập sai. Vui lòng thử lại sau 15 phút.');
      }

      throw error;
    }
  }
}
```

### Step 3: Hook with Lockout Tracking
```typescript
// hooks/auth/useLogin.ts (Local state + React Query)
import { useState, useCallback } from 'react';
import { useLoginMutation } from './useLoginMutation';
import type { LoginRequest } from '@/lib/schemas/auth';

export const useLogin = () => {
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);

  const { mutate: login, isPending, error } = useLoginMutation();

  const handleLogin = useCallback((data: LoginRequest) => {
    const now = Date.now();

    // Check if locked out
    if (lockoutTime && now < lockoutTime) {
      const remainingMs = lockoutTime - now;
      const remainingMin = Math.ceil(remainingMs / 60000);
      throw new Error(`Tài khoản bị khóa. Thử lại sau ${remainingMin} phút.`);
    }

    login(data, {
      onSuccess: () => {
        setFailedAttempts(0);
        setLockoutTime(null);
      },
      onError: () => {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);

        if (newAttempts >= 5) {
          setLockoutTime(Date.now() + 15 * 60 * 1000); // 15 minutes
        }
      },
    });
  }, [login, lockoutTime, failedAttempts]);

  return { handleLogin, isPending, error, isLockedOut: !!lockoutTime };
};
```

## Token Management

### Zustand Store with Persistence
```typescript
// store/slices/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'FARM_OWNER' | 'FARM_MANAGER' | 'EMPLOYEE' | null;
  status: 'active' | 'pending' | 'locked' | 'disabled';
}

interface AuthStore {
  // State
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      logout: () => set({ user: null, accessToken: null, refreshToken: null }),
      clearAuth: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
```

## Axios Interceptors (Token Management)

```typescript
// config/axios.ts
import axios from 'axios';
import { useAuthStore } from '@/store';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
});

// Request interceptor: Add token to headers
apiClient.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle 401 (token expired) → refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, setTokens, clearAuth } = useAuthStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
            { refreshToken }
          );

          setTokens(data.accessToken, data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          clearAuth();
          // Redirect to login
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);
```

## Email Verification Flow

```typescript
// lib/schemas/auth/verify-email.schemas.ts
export const VerifyEmailRequestSchema = z.object({
  token: z.string().min(1, 'Token bắt buộc'),
});

export const VerifyEmailResponseSchema = z.object({
  status: z.enum(['active', 'pending']),
  message: z.string(),
});
```

## Reset Password Flow (Forgot Password)

```typescript
// lib/schemas/auth/forgot-password.schemas.ts
export const ForgotPasswordRequestSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

export const ResetPasswordRequestSchema = z.object({
  token: z.string(),
  password: z.string()
    .min(8, 'Mật khẩu ≥ 8 ký tự')
    .regex(/^(?=.*[A-Z])(?=.*[0-9]).{8,}$/, 'Mật khẩu phải chứa chữ hoa + số'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp',
  path: ['confirmPassword'],
});
```
