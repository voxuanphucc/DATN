import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { mockUsers } from '../../types/auth';
import { loginSchema, type LoginFormValues } from '../../lib/schemas/auth.schemas';

export function LoginForm() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const isLocked = failedAttempts >= 5;

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);

    if (isLocked) {
      setServerError('Tài khoản bị khóa tạm thời do đăng nhập sai nhiều lần');
      return;
    }

    // Simulate API call
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

    navigate('/dashboard');
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          {serverError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              disabled={isSubmitting || isLocked}
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mật khẩu</Label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-primary hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              disabled={isSubmitting || isLocked}
              aria-invalid={!!errors.password}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || isLocked}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Đăng nhập
          </Button>
        </div>
      </form>

      <div className="text-center text-sm">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="font-medium text-primary hover:underline">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
}