
import { AuthLayout } from '../components/auth/AuthLayout';
import { LoginForm } from '../components/auth/LoginForm';
export function LoginPage() {
  return (
    <AuthLayout
      title="Chào mừng trở lại"
      subtitle="Đăng nhập vào tài khoản của bạn để tiếp tục quản lý trang trại."
      imageSrc="https://images.unsplash.com/photo-1592982537447-6f2a6a0c5c1b?q=80&w=2000&auto=format&fit=crop">

      <LoginForm />
    </AuthLayout>);

}