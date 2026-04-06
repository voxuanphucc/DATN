---
name: datn-react
description: Create, refactor, and debug React components following DATN conventions. Use for: building UI components with TypeScript, TailwindCSS, Radix UI; implementing custom hooks with Zustand + React Query; creating forms with React Hook Form + Zod validation; fixing React issues (stale closure, infinite loops, state management).
argument-hint: What React task or issue to work on
---

# DATN React Development Skill

> Chuyên xử lý React code áp dụng patterns, best practices, và conventions của project DATN. Từ tạo component cho đến debug issues.

## When to Use

✅ Tạo component mới (UI, Page, Layout)  
✅ Implement custom hooks (logic reusable, state management)  
✅ Xử lý forms với React Hook Form + Zod validation  
✅ Debug React issues (stale closure, infinite loop, race condition)  
✅ Refactor code theo best practices  
✅ Tối ưu performance (useMemo, useCallback, re-render)  
✅ Kiểm tra lỗi TypeScript, type safety

---

## 📋 Conventions & Patterns

### 1. **Project Architecture**

```
src/
├── components/          # Reusable UI components
├── pages/               # Page components (one per route)
├── hooks/               # Custom hooks (feature-based + utility)
├── services/            # API service classes
├── store/               # Zustand stores (slices/)
├── lib/
│   ├── schemas/         # Zod validation schemas
│   └── utils/           # Pure utility functions
├── types/               # TypeScript types/interfaces
├── config/              # Configuration (axios, env)
└── styles/              # Global styles, theme
```

### 2. **Component Structure**

#### **UI Component (Reusable)**
```typescript
// components/ui/Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';

const buttonVariants = cva(
  'px-4 py-2 font-medium rounded transition',
  {
    variants: {
      variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      },
      size: {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({ variant, size, className, ...props }: ButtonProps) => (
  <button className={clsx(buttonVariants({ variant, size }), className)} {...props} />
);
```

#### **Feature Component (Page/Feature)**
```typescript
// components/auth/LoginForm.tsx
import { useLoginMutation } from '@/hooks/auth';
import { LoginForm as LoginFormComponent } from '@/components/forms';

export const LoginForm = () => {
  const { mutate: login, isPending, error } = useLoginMutation();

  return <LoginFormComponent onSubmit={login} isLoading={isPending} error={error} />;
};
```

### 3. **Hooks Pattern** (Custom Hooks)

#### **Feature-based Hook** (Specific to 1-2 features)
```typescript
// hooks/auth/useLoginMutation.ts
import { useMutation } from '@tanstack/react-query';
import { loginService } from '@/services/auth';
import type { LoginRequest, LoginResponse } from '@/types/auth';

export const useLoginMutation = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: async (data) => {
      const { data: response } = await loginService.login(data);
      return response;
    },
    onSuccess: (data) => {
      // Side effects: save token, redirect, etc.
    },
    onError: (error) => {
      // Handle error: timeout, network, etc.
    },
  });
};
```

#### **Utility Hook** (Reusable across features)
```typescript
// hooks/useDebounce.ts
import { useEffect, useState } from 'react';

export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // Cleanup
  }, [value, delay]);

  return debouncedValue;
};
```

### 4. **Utils Pattern** (Pure Functions)

```typescript
// lib/utils/permissionUtils.ts
export const hasPermission = (userRole: string, requiredRole: string): boolean => {
  const ROLE_WEIGHT = { ADMIN: 3, MANAGER: 2, EMPLOYEE: 1 };
  return (ROLE_WEIGHT[userRole] ?? 0) >= (ROLE_WEIGHT[requiredRole] ?? 0);
};

// lib/utils/formatters.ts
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};
```

### 5. **Validation with Zod**

```typescript
// lib/schemas/auth/login.schemas.ts
import { z } from 'zod';

export const LoginRequestSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Mật khẩu ≥ 8 ký tự'),
});

export const LoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    role: z.enum(['ADMIN', 'MANAGER', 'EMPLOYEE']),
  }),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
```

### 6. **Service Layer**

```typescript
// services/auth/login.ts
import { apiClient } from '@/services/base';
import { LoginRequestSchema, LoginResponseSchema, type LoginRequest, type LoginResponse } from '@/lib/schemas/auth';

export class LoginService {
  async login(data: LoginRequest): Promise<{ data: LoginResponse }> {
    const validatedInput = LoginRequestSchema.parse(data);
    
    const response = await apiClient.post('/auth/login', validatedInput);
    const validatedResponse = LoginResponseSchema.parse(response.data);
    
    return { data: validatedResponse };
  }
}

export const loginService = new LoginService();
```

### 7. **State Management with Zustand**

```typescript
// store/slices/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthState } from '@/types/auth';

interface AuthStore extends AuthState {
  setUser: (user: AuthState['user']) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
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
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken }),
    }
  )
);
```

### 8. **Forms with React Hook Form**

```typescript
// components/forms/LoginForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginRequestSchema, type LoginRequest } from '@/lib/schemas/auth';

interface LoginFormProps {
  onSubmit: (data: LoginRequest) => void;
  isLoading?: boolean;
  error?: string;
}

export const LoginForm = ({ onSubmit, isLoading, error }: LoginFormProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password')} type="password" placeholder="Mật khẩu" />
      {errors.password && <span>{errors.password.message}</span>}
      
      {error && <div className="text-red-600">{error}</div>}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
    </form>
  );
};
```

---

## 🔧 Development Workflow

### **Creating a New Component**
1. Determine component type (UI vs Feature)
2. Create file in appropriate folder
3. Define Props interface (TypeScript)
4. Implement component with TailwindCSS + Radix UI
5. Export from `index.ts` (if in folder)

### **Creating a Custom Hook**
1. Analyze if it's **Feature-based** or **Utility**
2. Create in `hooks/[feature]/useXxx.ts`
3. **Feature-based**: Use React Query, side effects OK
4. **Utility**: Pure logic, no state/side effects
5. Add cleanup for subscriptions, event listeners
6. Include Dependency array in useEffect

### **Creating a Service**
1. Create in `services/[feature]/`
2. Validate input with Zod schema
3. Call API via apiClient (with interceptors)
4. Validate response with Zod schema
5. Return type: `{ data: T }` or throw

### **Creating & Using Zustand Store**
1. Define store interface (State + Actions)
2. Use `persist` middleware for localStorage
3. Create selectors: `useAuthStore(state => state.user)`
4. Avoid props drilling; use store for global state

---

## 🐛 Common Issues & Debugging

### **Issue 1: Stale Closure in useEffect**
```typescript
// ❌ SAI: counter bị "đóng băng" trong effect
useEffect(() => {
  const interval = setInterval(() => {
    console.log(counter); // Luôn in giá trị cũ
  }, 1000);
  return () => clearInterval(interval);
}, []); // ← Thiếu counter trong dependency

// ✅ ĐÚNG: counter được update
useEffect(() => {
  const interval = setInterval(() => {
    console.log(counter); // In giá trị mới
  }, 1000);
  return () => clearInterval(interval);
}, [counter]); // ← Thêm counter
```

### **Issue 2: Infinite Loop - API Calls**
```typescript
// ❌ SAI: fetch lại vô tận vì fetchData object khác tham chiếu mỗi render
useEffect(() => {
  const fetchData = async () => await fetch('/api/data');
  fetchData();
}, [fetchData]); // ← Chuẩn không?

// ✅ ĐÚNG 1: Không có dependency
useEffect(() => {
  const fetchData = async () => await fetch('/api/data');
  fetchData();
}, []); // ← Chạy 1 lần khi mount

// ✅ ĐÚNG 2: Dùng React Query (nên dùng)
const { data } = useQuery({ queryKey: ['data'], queryFn: () => fetch('/api/data') });
```

### **Issue 3: Memory Leak - Event Listener**
```typescript
// ❌ SAI: Listener không bị remove
useEffect(() => {
  window.addEventListener('resize', handleResize);
}, []);

// ✅ ĐÚNG: Cleanup function
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, [handleResize]);
```

### **Issue 4: Race Condition - Multiple API Calls**
```typescript
// ❌ SAI: 2 request đang xử lý cùng lúc, result từ cái cũ override cái mới
let isIgnored = false;
useEffect(() => {
  fetchData().then(res => setState(res));
  fetchData2().then(res => setState(res)); // Race!
}, []);

// ✅ ĐÚNG: Dùng React Query hoặc AbortController
useEffect(() => {
  const abortController = new AbortController();
  fetchData({ signal: abortController.signal })
    .then(res => setState(res))
    .catch(err => err.name !== 'AbortError' && console.error(err));
  
  return () => abortController.abort();
}, []);
```

### **Issue 5: Type Errors - Zod Parsing**
```typescript
// ❌ SAI: response có thể missing fields
const response = await fetch('/api/user').then(r => r.json());
console.log(response.email.toLowerCase()); // Error: cannot read property 'email'

// ✅ ĐÚNG: Validate với Zod
const UserSchema = z.object({ email: z.string() });
const response = UserSchema.parse(await fetch('/api/user').then(r => r.json()));
console.log(response.email.toLowerCase()); // Safe!
```

---

## 📚 Quick Reference

### **Hooks vs Utils**
| Trường hợp | Nên Dùng | Lý Do |
|-----------|---------|-------|
| Tính cấp bậc user > admin? | **Utils** | Pure logic, không state |
| Kiểm tra user hiện tại đủ quyền? | **Hook** | Biết current user (state) |
| Format số tiền? | **Utils** | Pure function, lúc nào cũng đúng |
| Detect user logout → redirect? | **Hook** | Side effect, cần theo dõi state |
| Validate email format? | **Utils** | Pure regex |
| Fetch & lưu data? | **Hook** | Async + side effect |

### **State Management Decision Tree**
```
Single component? → useState
2-3 related states? → useState
Many states, complex logic? → useReducer
Share across components (não prop drilling)? → Zustand
Server state (API, caching)? → React Query
```

### **Error Handling Template**
```typescript
try {
  const isTimeout = error.message?.includes('timeout') || error.code === 'ECONNABORTED';
  const isNetworkError = error.message === 'Network Error';
  
  if (isTimeout) {
    // Handle timeout
  } else if (isNetworkError) {
    // Handle network error
  } else if (error.response?.status === 401) {
    // Handle unauthorized
  } else {
    // Handle other errors
  }
} catch (err) {
  console.error('Unexpected error:', err);
}
```

### **TypeScript Best Practices**
- ✅ Luôn define Props interface
- ✅ Dùng `z.infer<typeof Schema>` thay vì type duplication
- ✅ Generic types: `<T extends BaseType>`
- ✅ Avoid `any`; dùng `unknown` nếu cần
- ✅ Nullable: `type | null` không `type | undefined`

---

## 🚀 Workflow Cheat Sheets

### **Create Page Component**
```bash
1. Create src/pages/[Feature]/[FeaturePage].tsx
2. Create src/hooks/[feature]/useFeature*.ts (custom hooks)
3. Create src/services/[feature]/index.ts (API calls)
4. Create src/lib/schemas/[feature]/*.schemas.ts (validation)
5. Export from src/pages/index.ts
6. Add route to src/routes/privateRoutes.tsx or publicRoutes.tsx
```

### **Create Form Component**
```bash
1. Create Zod schema in lib/schemas/[feature]/[form].schemas.ts
2. Create component in components/forms/[Form].tsx
3. Use useForm + form context if complex
4. Validate onBlur + onSubmit
5. Show errors from react-hook-form
6. Connect to mutation hook from the page
```

### **Add New API Endpoint**
```bash
1. Create type in types/[feature]/
2. Create schema (request + response) in lib/schemas/[feature]/
3. Create service in services/[feature]/[endpoint].ts
4. Create hook in hooks/[feature]/use[Endpoint]*.ts (Query or Mutation)
5. Use in component
```

---

## 📖 Related Documentation
- Project System Overview: `.github/skills/datn-react/references/SYSTEM.md`
- Auth Implementation Guide: `.github/skills/datn-react/references/AUTH.md`
- Schema Architecture: `.github/skills/datn-react/references/SCHEMAS.md`
