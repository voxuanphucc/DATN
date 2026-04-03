import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useResetPassword } from '../../hooks/reset-password/useResetPassword';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const {
    form: { register, formState: { errors, isSubmitting } },
    serverError,
    isSuccess,
    isTokenValid,
    onSubmit,
  } = useResetPassword();

  return (
    <AuthLayout
      title="Đặt lại mật khẩu"
      subtitle="Vui lòng nhập mật khẩu mới cho tài khoản của bạn."
      imageSrc="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2000&auto=format&fit=crop"
    >
      {!isTokenValid ? (
        <div className="grid gap-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
            </AlertDescription>
          </Alert>
          <Button onClick={() => navigate('/forgot-password')} className="w-full">
            Yêu cầu liên kết mới
          </Button>
        </div>
      ) : isSuccess ? (
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950/50">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Đặt lại mật khẩu thành công! Đang chuyển hướng đến trang đăng nhập...
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-6">
          <form onSubmit={onSubmit}>
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
      )}
    </AuthLayout>
  );
}
