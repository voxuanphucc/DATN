import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { RegisterForm } from '../components/auth/RegisterForm';
export function RegisterPage() {
  return (
    <AuthLayout
      title="Tạo tài khoản mới"
      subtitle="Bắt đầu hành trình quản lý trang trại thông minh của bạn ngay hôm nay."
      imageSrc="https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=2000&auto=format&fit=crop">
      
      <RegisterForm />
    </AuthLayout>);

}