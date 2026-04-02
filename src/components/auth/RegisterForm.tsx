import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { mockUsers } from '../../types/auth';
import { registerSchema, type RegisterFormValues } from '../../lib/schemas/auth.schemas';

export function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setServerError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (mockUsers.some((u) => u.email === data.email)) {
      setServerError('Email đã được sử dụng');
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <Alert className="border-green-500 bg-green-50 dark:bg-green-950/50">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          Đăng ký thành công! Vui lòng kiểm tra email của bạn để xác thực tài
          khoản trước khi đăng nhập.
          <div className="mt-4">
            <Button asChild variant="outline" className="w-full">
              <Link to="/login">Quay lại đăng nhập</Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-3">
          {serverError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}

          {/* Full name */}
          <div className="grid gap-1">
            <Label htmlFor="fullName">
              Họ và tên <span className="text-destructive">*</span>
            </Label>
            <Input
              id="fullName"
              disabled={isSubmitting}
              aria-invalid={!!errors.fullName}
              {...register('fullName')}
            />
            {errors.fullName && (
              <p className="text-xs text-destructive">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Farm name */}
          <div className="grid gap-1">
            <Label htmlFor="farmName">Tên trang trại</Label>
            <Input
              id="farmName"
              placeholder="Trang trại của tôi"
              disabled={isSubmitting}
              {...register('farmName')}
            />
          </div>

          {/* Password */}
          <div className="grid gap-1">
            <Label htmlFor="password">
              Mật khẩu <span className="text-destructive">*</span>
            </Label>
            <Input
              id="password"
              type="password"
              disabled={isSubmitting}
              aria-invalid={!!errors.password}
              {...register('password')}
            />
            {errors.password ? (
              <p className="text-xs text-destructive">{errors.password.message}</p>
            ) : (
              <p className="text-xs text-muted-foreground">≥ 8 ký tự, có chữ hoa và số</p>
            )}
          </div>

          {/* Confirm password */}
          <div className="grid gap-1">
            <Label htmlFor="confirmPassword">
              Xác nhận mật khẩu <span className="text-destructive">*</span>
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              disabled={isSubmitting}
              aria-invalid={!!errors.confirmPassword}
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Đăng ký tài khoản
          </Button>
        </div>
      </form>

      <div className="text-center text-sm">
        Đã có tài khoản?{' '}
        <Link to="/login" className="font-medium text-primary hover:underline">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
}