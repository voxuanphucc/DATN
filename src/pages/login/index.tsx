import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useLogin } from '../../hooks/login/useLogin';

export function LoginPage() {
  const navigate = useNavigate();
  const {
    form: { register, formState: { errors, isSubmitting } },
    serverError,
    isLocked,
    onSubmit,
  } = useLogin();

  return (
    <AuthLayout
      title="Chào mừng trở lại"
      subtitle="Đăng nhập vào tài khoản của bạn để tiếp tục quản lý trang trại."
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

      <form onSubmit={onSubmit} className="space-y-6">
        {serverError && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 font-medium">
              {serverError}
            </AlertDescription>
          </Alert>
        )}

        {/* Form Group */}
        <div className="space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-emerald-900">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              disabled={isSubmitting || isLocked}
              aria-invalid={!!errors.email}
              {...register('email')}
              className="input-field h-11 rounded-lg"
            />
            {errors.email && (
              <p className="text-xs text-red-600 font-medium">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-semibold text-emerald-900">
                Mật khẩu
              </Label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Quên mật khẩu?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              disabled={isSubmitting || isLocked}
              aria-invalid={!!errors.password}
              {...register('password')}
              className="input-field h-11 rounded-lg"
            />
            {errors.password && (
              <p className="text-xs text-red-600 font-medium">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || isLocked}
          className="w-full h-11 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-emerald-100" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-emerald-600/60">hoặc</span>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm text-emerald-900">
            Chưa có tài khoản?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
