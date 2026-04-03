import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useRegister } from '../../hooks/register/useRegister';

export function RegisterPage() {
  const navigate = useNavigate();
  const {
    form: { register, formState: { errors, isSubmitting } },
    serverError,
    isSuccess,
    onSubmit,
  } = useRegister();

  return (
    <AuthLayout
      title="Tạo tài khoản mới"
      subtitle="Bắt đầu hành trình quản lý trang trại thông minh của bạn ngay hôm nay."
      imageSrc="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2000&auto=format&fit=crop"
    >
      {isSuccess ? (
        <Alert className="border-green-500 bg-green-50 dark:bg-green-950/50">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            Đăng ký thành công! Vui lòng kiểm tra email của bạn để xác thực tài
            khoản trước khi đăng nhập.
            <div className="mt-4">
              <Button onClick={() => navigate('/login')} variant="outline" className="w-full">
                Quay lại đăng nhập
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-4">
          <form onSubmit={onSubmit}>
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
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-primary hover:underline cursor-pointer"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
