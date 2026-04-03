import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Button } from '../../components/ui/button';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useEmailVerification } from '../../hooks/email-verification/useEmailVerification';

export function EmailVerificationPage() {
  const navigate = useNavigate();
  const { status, isResending, handleResendEmail } = useEmailVerification();

  return (
    <AuthLayout
      title="Xác thực Email"
      subtitle="Đang kiểm tra thông tin xác thực của bạn..."
      imageSrc="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
    >
      <div className="mt-8">
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">
              Đang xác thực email của bạn...
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="grid gap-6">
            <Alert className="border-green-500 bg-green-50 dark:bg-green-950/50">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-green-800 dark:text-green-200 ml-2 text-base">
                Xác thực email thành công! Tài khoản của bạn đã được kích hoạt
                và trang trại mặc định đã được tạo.
              </AlertDescription>
            </Alert>
            <Button onClick={() => navigate('/login')} className="w-full">
              Đăng nhập ngay
            </Button>
          </div>
        )}

        {status === 'error' && (
          <div className="grid gap-6">
            <Alert variant="destructive">
              <XCircle className="h-5 w-5" />
              <AlertDescription className="ml-2 text-base">
                Liên kết xác thực đã hết hạn hoặc không hợp lệ.
              </AlertDescription>
            </Alert>
            <Button
              className="w-full"
              onClick={handleResendEmail}
              disabled={isResending}
            >
              {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Gửi lại email xác thực
            </Button>
            <Button onClick={() => navigate('/login')} variant="outline" className="w-full">
              Quay lại đăng nhập
            </Button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
