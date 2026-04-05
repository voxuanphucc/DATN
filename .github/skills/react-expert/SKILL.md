---
name: react-expert
description: 'Chuyên gia React development với TypeScript, TailwindCSS, Zustand, React Query, React Hook Form, và Radix UI. Sử dụng khi: tạo components, custom hooks, quản lý state, xử lý forms, routing, tối ưu performance, và debug React apps.'
argument-hint: 'Mô tả component/feature cần tạo hoặc vấn đề cần giải quyết'
---

# React Expert - Chuyên Gia React Development

## Tech Stack Của Dự Án

- **Framework**: React 18.3 + TypeScript 5.9
- **Build Tool**: Vite 5.2
- **Styling**: TailwindCSS 3.4 + CSS Modules
- **State Management**: Zustand 5.0
- **Data Fetching**: TanStack React Query 5.96
- **Forms**: React Hook Form 7.72 + Zod 4.3
- **Routing**: React Router DOM 6.26
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion 11.5
- **Utils**: clsx, tailwind-merge, date-fns

## Khi Nào Sử Dụng Skill Này

- ✅ Tạo React components mới (functional components)
- ✅ Xây dựng custom hooks
- ✅ Quản lý state với Zustand
- ✅ Fetch data với React Query
- ✅ Tạo forms với validation (React Hook Form + Zod)
- ✅ Implement routing và navigation
- ✅ Tối ưu performance (memo, useMemo, useCallback)
- ✅ Debug React issues
- ✅ Refactor components
- ✅ Implement patterns (compound components, render props, HOC)

## Cấu Trúc Dự Án

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── layout/        # Layout components
├── hooks/         # Custom React hooks
├── store/         # Zustand stores
├── services/      # API services
├── types/         # TypeScript types
├── utils/         # Helper functions
├── routes/        # Route definitions
├── config/        # App configuration
├── lib/           # Third-party lib configs
└── assets/        # Static assets
```

## Best Practices & Conventions

### 1. Component Structure

```typescript
// components/UserCard/UserCard.tsx
import { memo } from 'react';
import { cn } from '@/lib/utils';

interface UserCardProps {
  name: string;
  email: string;
  role?: 'admin' | 'user';
  className?: string;
}

export const UserCard = memo<UserCardProps>(({ 
  name, 
  email, 
  role = 'user',
  className 
}) => {
  return (
    <div className={cn(
      'rounded-lg border p-4',
      className
    )}>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{email}</p>
      <span className="text-xs">{role}</span>
    </div>
  );
});

UserCard.displayName = 'UserCard';
```

**Nguyên tắc:**
- ✅ Sử dụng TypeScript với interface đầy đủ
- ✅ Destructure props
- ✅ Default values cho optional props
- ✅ Sử dụng `cn()` utility để merge Tailwind classes
- ✅ Memo components khi cần thiết
- ✅ Set displayName cho components được memo

### 2. Custom Hooks

```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

**Nguyên tắc:**
- ✅ Prefix với `use`
- ✅ Generic types khi cần
- ✅ Error handling
- ✅ Clear return types

### 3. Zustand Store

```typescript
// store/userStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
    }
  )
);
```

**Nguyên tắc:**
- ✅ Tách interface cho state và actions
- ✅ Sử dụng persist middleware khi cần
- ✅ Actions đơn giản, rõ ràng
- ✅ Tên store theo pattern `use[Name]Store`

### 4. React Query

```typescript
// services/userService.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface User {
  id: string;
  name: string;
}

// Query
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get<User[]>('/api/users');
      return data;
    },
  });
}

// Mutation
export function useCreateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (newUser: Omit<User, 'id'>) => {
      const { data } = await axios.post<User>('/api/users', newUser);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
```

**Nguyên tắc:**
- ✅ Query keys rõ ràng, consistent
- ✅ Type-safe với TypeScript
- ✅ Invalidate queries sau mutations
- ✅ Handle loading và error states

### 5. Forms với React Hook Form + Zod

```typescript
// components/UserForm/UserForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  age: z.number().min(18, 'Phải từ 18 tuổi trở lên'),
});

type UserFormData = z.infer<typeof userSchema>;

export function UserForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = (data: UserFormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('name')} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      
      <div>
        <input {...register('email')} type="email" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      
      <div>
        <input {...register('age', { valueAsNumber: true })} type="number" />
        {errors.age && <span>{errors.age.message}</span>}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Nguyên tắc:**
- ✅ Define schema với Zod
- ✅ Infer TypeScript types từ schema
- ✅ Validation messages bằng tiếng Việt
- ✅ Handle errors properly

### 6. Routing

```typescript
// routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layout/MainLayout';
import { HomePage } from '@/pages/HomePage';
import { UserPage } from '@/pages/UserPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'users/:id',
        element: <UserPage />,
      },
    ],
  },
]);
```

**Nguyên tắc:**
- ✅ Nested routes với layout
- ✅ Dynamic params khi cần
- ✅ Lazy loading cho routes lớn

## Performance Optimization

### 1. Memo Components
```typescript
export const ExpensiveComponent = memo(({ data }) => {
  // Component chỉ re-render khi data thay đổi
  return <div>{/* ... */}</div>;
});
```

### 2. useMemo
```typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

### 3. useCallback
```typescript
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### 4. Code Splitting
```typescript
const LazyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

## Common Patterns

### 1. Compound Components
```typescript
export function Select({ children }) {
  return <div className="select">{children}</div>;
}

Select.Trigger = function Trigger({ children }) {
  return <button>{children}</button>;
};

Select.Content = function Content({ children }) {
  return <div className="content">{children}</div>;
};

// Usage
<Select>
  <Select.Trigger>Open</Select.Trigger>
  <Select.Content>Items...</Select.Content>
</Select>
```

### 2. Render Props
```typescript
function DataFetcher({ render }) {
  const { data, loading } = useFetch();
  return render({ data, loading });
}

// Usage
<DataFetcher render={({ data, loading }) => (
  loading ? <Spinner /> : <List data={data} />
)} />
```

## Styling với TailwindCSS

### 1. Utility Classes
```typescript
<div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-md">
  {/* Content */}
</div>
```

### 2. Conditional Classes với clsx
```typescript
import { clsx } from 'clsx';

<button className={clsx(
  'px-4 py-2 rounded',
  isActive && 'bg-blue-500 text-white',
  isDisabled && 'opacity-50 cursor-not-allowed'
)}>
  Click me
</button>
```

### 3. Merge Classes với cn utility
```typescript
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function Card({ className }: Props) {
  return (
    <div className={cn(
      'rounded-lg border bg-white p-4',
      className
    )}>
      {/* Content */}
    </div>
  );
}
```

## Debugging Tips

### 1. React DevTools
- Inspect component hierarchy
- Check props và state
- Profile performance

### 2. Console Logs
```typescript
useEffect(() => {
  console.log('Component mounted');
  console.log('Props:', props);
  console.log('State:', state);
}, [props, state]);
```

### 3. Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

## Quy Trình Tạo Feature Mới

### Bước 1: Define Types
```typescript
// types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}
```

### Bước 2: Create API Service
```typescript
// services/productService.ts
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}
```

### Bước 3: Create Store (nếu cần)
```typescript
// store/cartStore.ts
export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ 
    items: [...state.items, item] 
  })),
}));
```

### Bước 4: Create Components
```typescript
// components/ProductCard/ProductCard.tsx
export function ProductCard({ product }: Props) {
  // Component logic
}
```

### Bước 5: Create Page
```typescript
// pages/ProductsPage/ProductsPage.tsx
export function ProductsPage() {
  const { data: products } = useProducts();
  // Page logic
}
```

### Bước 6: Add Route
```typescript
// routes/index.tsx
{
  path: '/products',
  element: <ProductsPage />,
}
```

## Checklist Trước Khi Commit

- [ ] Components có TypeScript types đầy đủ
- [ ] Props được destructure và có default values
- [ ] Memo components khi cần thiết
- [ ] Custom hooks follow naming convention
- [ ] Forms có validation với Zod
- [ ] Loading và error states được handle
- [ ] Tailwind classes được organize tốt
- [ ] No console.log trong production code
- [ ] Components được test (nếu có tests)

## Anti-Patterns Cần Tránh

### ❌ Không nên:
```typescript
// Mutate state directly
state.items.push(newItem);

// Use index as key
{items.map((item, index) => <div key={index}>{item}</div>)}

// Inline function trong render
<button onClick={() => handleClick(id)}>Click</button>

// Large components (>200 lines)
```

### ✅ Nên:
```typescript
// Immutable updates
setState({ items: [...state.items, newItem] });

// Unique keys
{items.map((item) => <div key={item.id}>{item}</div>)}

// useCallback for handlers
const handleClick = useCallback(() => {...}, [id]);

// Split into smaller components
```

## Resources

### Documentation
- [React Docs](https://react.dev)
- [TanStack Query](https://tanstack.com/query)
- [Zustand](https://zustand-demo.pmnd.rs)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Radix UI](https://radix-ui.com)
- [TailwindCSS](https://tailwindcss.com)

### Internal References
- Project structure: `src/`
- Shared components: `src/components/`
- Custom hooks: `src/hooks/`
- Stores: `src/store/`
- Utils: `src/lib/utils.ts`
