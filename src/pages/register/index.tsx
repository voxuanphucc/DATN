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
      subtitle="Bắt đầu quản lý trang trại thông minh ngay hôm nay."
      imageSrc="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=2000&auto=format&fit=crop"
    >
      <style>{`
        .input-field {
          transition: all 0.2s ease;
          border: 1px solid rgba(5, 150, 105, 0.2);
          background-color: rgba(5, 150, 105, 0.03);
        }
        
        .input-field:focus {
          border-color: rgba(5, 150, 105, 0.5);
          background-color: white;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
        }
      `}</style>

      {isSuccess ? (
        <Alert className="border-green-500 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Đăng ký thành công! Kiểm tra email để xác thực tài khoản.
            <div className="mt-3">
              <Button
                onClick={() => navigate('/login')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm h-9"
              >
                Quay lại đăng nhập
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={onSubmit} className="space-y-3">
          {serverError && (
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 text-sm">
                {serverError}
              </AlertDescription>
            </Alert>
          )}

          {/* Form Fields Group */}
          <div className="space-y-2.5">
            {/* Full Name */}
            <div className="space-y-1">
              <Label htmlFor="fullName" className="text-xs font-semibold text-foreground">
                Họ và tên <span className="text-red-600">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Nguyễn Văn A"
                disabled={isSubmitting}
                aria-invalid={!!errors.fullName}
                {...register('fullName')}
                className="input-field h-9 rounded-lg text-sm"
              />
              {errors.fullName && (
                <p className="text-xs text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs font-semibold text-foreground">
                Email <span className="text-red-600">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                disabled={isSubmitting}
                aria-invalid={!!errors.email}
                {...register('email')}
                className="input-field h-9 rounded-lg text-sm"
              />
              {errors.email && (
                <p className="text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Farm Name — PB01: yêu cầu nhập tên trang trại */}
            <div className="space-y-1">
              <Label htmlFor="farmName" className="text-xs font-semibold text-foreground">
                Tên trang trại
                <span className="text-muted-foreground font-normal ml-1">(tùy chọn)</span>
              </Label>
              <Input
                id="farmName"
                placeholder="Trang trại Hoa Hồng"
                disabled={isSubmitting}
                aria-invalid={!!errors.farmName}
                {...register('farmName')}
                className="input-field h-9 rounded-lg text-sm"
              />
              {errors.farmName && (
                <p className="text-xs text-red-600">{errors.farmName.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password" className="text-xs font-semibold text-foreground">
                Mật khẩu <span className="text-red-600">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                disabled={isSubmitting}
                aria-invalid={!!errors.password}
                {...register('password')}
                className="input-field h-9 rounded-lg text-sm"
              />
              {errors.password ? (
                <p className="text-xs text-red-600">{errors.password.message}</p>
              ) : (
                <p className="text-xs text-muted-foreground">≥ 8 ký tự, có chữ hoa và số</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-xs font-semibold text-foreground">
                Xác nhận mật khẩu <span className="text-red-600">*</span>
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                disabled={isSubmitting}
                aria-invalid={!!errors.confirmPassword}
                {...register('confirmPassword')}
                className="input-field h-9 rounded-lg text-sm"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-9 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all mt-3 text-sm"
          >
            {isSubmitting && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
            {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
          </Button>

          {/* Sign In Link */}
          <div className="text-center pt-1">
            <p className="text-xs text-foreground">
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-semibold text-primary hover:opacity-80"
              >
                Đăng nhập
              </button>
            </p>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}
