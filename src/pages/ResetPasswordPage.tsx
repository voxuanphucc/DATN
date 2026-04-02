import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { ResetPasswordForm } from '../components/auth/ResetPasswordForm';
export function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Đặt lại mật khẩu"
      subtitle="Vui lòng nhập mật khẩu mới cho tài khoản của bạn."
      imageSrc="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2000&auto=format&fit=crop">
      
      <ResetPasswordForm />
    </AuthLayout>);

}