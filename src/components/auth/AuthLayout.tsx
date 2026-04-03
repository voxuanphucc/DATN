import React from 'react';
import { Link } from 'react-router-dom';
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
  return (
    <div className="h-screen w-full flex bg-background overflow-hidden">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center overflow-y-auto px-4 sm:px-6 lg:flex-none lg:w-[500px] xl:w-[600px] lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-5">
            <Link
              to="/"
              className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity">
              
              <Leaf className="h-8 w-8" />
              <span className="text-2xl font-bold tracking-tight">
                FarmerAI
              </span>
            </Link>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block relative flex-1">
        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-10" />
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop"
          alt="Farm landscape" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
          <h3 className="text-3xl font-bold mb-2">
            Quản lý nông trại thông minh
          </h3>
          <p className="text-lg text-white/80">
            Giải pháp toàn diện giúp tối ưu hóa năng suất, quản lý tài chính và
            theo dõi công việc hiệu quả cho trang trại của bạn.
          </p>
        </div>
      </div>
    </div>);

}