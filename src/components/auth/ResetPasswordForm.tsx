import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { resetPasswordSchema, type ResetPasswordFormValues } from '../../lib/schemas/auth.schemas';

export function ResetPasswordForm() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // In a real app, validate token from URL here
  const isTokenValid = true;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (_data: ResetPasswordFormValues) => {
    setServerError(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSuccess(true);
    setTimeout(() => navigate('/login'), 3000);
  };

  if (!isTokenValid) {
    return (
      <div className="grid gap-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
          </AlertDescription>
        </Alert>
        <Button asChild className="w-full">
          <Link to="/forgot-password">Yêu cầu liên kết mới</Link>
        </Button>
      </div>
    );
  }

  if (success) {
    return (
      <Alert className="border-green-500 bg-green-50 dark:bg-green-950/50">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertDescription className="text-green-800 dark:text-green-200">
          Đặt lại mật khẩu thành công! Đang chuyển hướng đến trang đăng nhập...
        </AlertDescription>
      </Alert>
    );
  }

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

          {/* New password */}
          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu mới</Label>
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
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
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

          <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Cập nhật mật khẩu
          </Button>
        </div>
      </form>
    </div>
  );
}