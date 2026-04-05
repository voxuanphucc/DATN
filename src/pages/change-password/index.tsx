import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { useChangePassword } from '../../hooks/change-password/useChangePassword';
import { FarmManagementLayout } from '@/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Change Password Page
 * Cho phép user đổi mật khẩu khi đang đăng nhập
 * 
 * Spec (PB03): 
 * - Nhập mật khẩu hiện tại
 * - Nhập mật khẩu mới (≥8 ký tự, có chữ hoa và số)
 * - Xác nhận mật khẩu mới
 * - Kiểm tra: mật khẩu hiện tại đúng, mật khẩu mới khác cũ, mật khẩu mới hợp lệ
 */
export function ChangePasswordPage() {
  const navigate = useNavigate();
  const {
    form: { register, formState: { errors, isSubmitting } },
    serverError,
    isSuccess,
    onSubmit,
  } = useChangePassword();

  return (
    <FarmManagementLayout>
      <div className="w-full max-w-2xl mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowLeft 
                className="h-5 w-5 cursor-pointer hover:text-primary" 
                onClick={() => navigate('/dashboard')}
              />
              Đổi mật khẩu
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {isSuccess ? (
              <div className="grid gap-6">
                <Alert className="border-green-500 bg-green-50">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 ml-2">
                    Đổi mật khẩu thành công! Đã cập nhật tài khoản của bạn.
                  </AlertDescription>
                </Alert>
                <Button onClick={() => navigate('/dashboard')} className="w-full">
                  Quay lại dashboard
                </Button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                {serverError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="ml-2">{serverError}</AlertDescription>
                  </Alert>
                )}

                {/* Current Password */}
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="font-semibold">
                    Mật khẩu hiện tại <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Nhập mật khẩu hiện tại"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.currentPassword}
                    {...register('currentPassword')}
                    className="h-10"
                  />
                  {errors.currentPassword && (
                    <p className="text-xs text-red-600">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="font-semibold">
                    Mật khẩu mới <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.newPassword}
                    {...register('newPassword')}
                    className="h-10"
                  />
                  {errors.newPassword ? (
                    <p className="text-xs text-red-600">{errors.newPassword.message}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      ≥ 8 ký tự, có chữ hoa và số. Phải khác mật khẩu cũ.
                    </p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-semibold">
                    Xác nhận mật khẩu mới <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Xác nhận mật khẩu mới"
                    disabled={isSubmitting}
                    aria-invalid={!!errors.confirmPassword}
                    {...register('confirmPassword')}
                    className="h-10"
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full h-10"
                >
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </FarmManagementLayout>
  );
}

export default ChangePasswordPage;
