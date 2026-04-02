import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm';
export function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Quên mật khẩu?"
      subtitle="Nhập email của bạn và chúng tôi sẽ gửi liên kết để đặt lại mật khẩu."
      imageSrc="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2000&auto=format&fit=crop">
      
      <ForgotPasswordForm />
    </AuthLayout>);

}