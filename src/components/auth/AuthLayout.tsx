import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  imageSrc?: string;
}

export function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex bg-white overflow-hidden">
      <style>{`
        .form-shadow {
          box-shadow: 0 12px 32px -8px rgba(5, 150, 105, 0.12),
                      0 4px 12px -4px rgba(5, 150, 105, 0.08);
          transition: box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .form-shadow:hover {
          box-shadow: 0 20px 48px -12px rgba(5, 150, 105, 0.18),
                      0 8px 16px -6px rgba(5, 150, 105, 0.12);
        }
      `}</style>

      {/* Left side - Form Container */}
      <div className="flex-1 flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:flex-none lg:w-[500px] xl:w-[600px] lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96 flex flex-col items-center justify-center">
          {/* Header with Logo */}
          <div className="mb-6 w-full">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity cursor-pointer group mb-6"
            >
              <div className="p-2 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-lg shadow-lg group-hover:shadow-xl transition-all">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">
                FarmerAI
              </span>
            </button>

            <h1 className="text-3xl font-bold text-foreground mb-2">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {/* Form Card with Box Shadow */}
          <div className="w-full bg-white rounded-2xl form-shadow p-8 sm:p-10 overflow-y-auto max-h-[calc(100vh-200px)]">
            {children}
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            FarmerAI © 2025 • Quản lý trang trại thông minh
          </p>
        </div>
      </div>

      {/* Right side - Background Image */}
      <div className="hidden lg:block relative flex-1 p-4">
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10" />
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
            alt="Farm landscape"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
            <h3 className="text-3xl font-bold mb-2">
              Quản lý nông trại thông minh
            </h3>
            <p className="text-lg text-white/80">
              Giải pháp toàn diện giúp tối ưu hóa năng suất, quản lý tài chính và theo dõi công việc hiệu quả cho trang trại của bạn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}