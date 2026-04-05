import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { AlertCircle, CheckCircle2, Loader2, Eye, EyeOff } from 'lucide-react';
import { useRegister } from '../../hooks/register/useRegister';
import { useState } from 'react';
import LoginBg from '@/assets/login.png';
import LogoBrowser from '@/assets/Logo-browser.png';


export function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    form: { register, formState: { errors, isSubmitting } },
    serverError,
    isSuccess,
    onSubmit,
  } = useRegister();

  return (
    <div className="h-screen w-full flex">
      <style>{`
        /* Left Column - Form Section */
        .form-section {
          width: 100%;
          height: 100vh;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem 1rem;
          position: relative;
          overflow: hidden;
        }

        @media (min-width: 1024px) {
          .form-section {
            width: 50%;
            padding: 2rem 2.5rem;
            overflow: hidden;
          }
        }

        .form-container {
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
          padding: 1.5rem;
          border-radius: 12px;
          background: white;
        }

        .form-header {
          margin-bottom: 1.25rem;
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .form-subtitle {
          color: #6b7280;
          font-size: 0.85rem;
        }

        .form-group {
          margin-bottom: 0.9rem;
        }

        .form-label {
          font-weight: 600;
          color: #111827;
          font-size: 0.8rem;
          display: block;
          margin-bottom: 0.25rem;
        }

        .form-label-required {
          color: #ef4444;
        }

        .form-label-optional {
          color: #9ca3af;
          font-weight: 400;
          font-size: 0.8rem;
        }

        .input-wrapper {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.875rem;
          background-color: #fff;
          color: #1f2937;
          transition: all 0.2s;
        }

        .form-input::placeholder {
          color: #9ca3af;
        }

        .form-input:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
          background-color: #fafafa;
        }

        .form-input:disabled {
          background-color: #f3f4f6;
          color: #9ca3af;
          cursor: not-allowed;
        }

        .password-toggle-btn {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 4px 8px;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }

        .password-toggle-btn:hover {
          color: #10b981;
        }

        .error-text {
          color: #ef4444;
          font-size: 0.8rem;
          font-weight: 500;
          margin-top: 0.375rem;
          display: block;
        }

        .hint-text {
          color: #6b7280;
          font-size: 0.8rem;
          margin-top: 0.375rem;
          display: block;
        }

        .submit-btn {
          width: 100%;
          padding: 0.7rem 1.25rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-top: 0.8rem;
        }

        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-link {
          text-align: center;
          margin-top: 0.9rem;
          color: #6b7280;
          font-size: 0.8rem;
        }

        .login-link-btn {
          color: #10b981;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }

        .login-link-btn:hover {
          color: #059669;
        }

        .success-alert {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .success-alert-content {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .success-alert-icon {
          color: #16a34a;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .success-alert-text {
          flex: 1;
        }

        .success-alert-title {
          color: #166534;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .success-alert-description {
          color: #15803d;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        .error-alert {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 0.75rem 0.875rem;
          margin-bottom: 1rem;
          display: flex;
          gap: 0.6rem;
          align-items: flex-start;
        }

        .error-alert-icon {
          color: #ef4444;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .error-alert-text {
          color: #7f1d1d;
          font-size: 0.8rem;
          font-weight: 500;
        }

        /* Right Column - Image Section */
        .image-section {
          display: none;
          width: 50%;
          background-size: cover;
          background-position: center;
          position: relative;
          border-radius: 16px 0 0 16px;
        }

        @media (min-width: 1024px) {
          .image-section {
            display: block;
          }
        }

        /* Animations */
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .form-container {
          animation: slideInLeft 0.5s ease-out;
        }
      `}</style>

      {/* Left Section - Form */}
      <div className="form-section">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="absolute top-0 left-0 p-4 md:p-8 flex items-center gap-2.5 bg-none border-none cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          <div className="relative" style={{
            filter: 'drop-shadow(0 4px 8px rgba(5, 150, 105, 0.25))'
          }}>
            <img
              src={LogoBrowser}
              alt="FarmerAI logo"
              className="h-8 md:h-10 object-contain transition-transform duration-300"
              style={{ filter: 'hue-rotate(0deg) brightness(1.1) saturate(1.3)' }}
            />
          </div>
          <span 
            className="font-prompt font-extrabold text-[38px] leading-none"
            style={{
              background: 'linear-gradient(135deg, #047857 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 2px 4px rgba(5, 150, 105, 0.1)'
            }}
          >
            farmarAI
          </span>
        </button>
        <div className="form-container">
          {/* Success State */}
          {isSuccess ? (
            <>
              <div className="form-header">
                <h1 className="form-title">Chúc mừng!</h1>
                <p className="form-subtitle">Tài khoản của bạn đã được tạo</p>
              </div>

              <div className="success-alert">
                <div className="success-alert-content">
                  <CheckCircle2 className="success-alert-icon h-6 w-6" />
                  <div className="success-alert-text">
                    <div className="success-alert-title">Đăng ký thành công!</div>
                    <div className="success-alert-description">
                      Kiểm tra email của bạn để xác thực tài khoản. Vui lòng nhấp vào liên kết xác nhận để hoàn thành quá trình đăng ký.
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="submit-btn"
                      style={{ marginTop: '1rem', marginBottom: '0.5rem' }}
                    >
                      Quay lại đăng nhập
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Header */}
              <div className="form-header">
                <h1 className="form-title">Bắt đầu ngay</h1>
                <p className="form-subtitle">Tạo tài khoản để quản lý trang trại</p>
              </div>

              {/* Form */}
              <form onSubmit={onSubmit}>
                {/* Error Alert */}
                {serverError && (
                  <div className="error-alert">
                    <AlertCircle className="error-alert-icon h-5 w-5" />
                    <div className="error-alert-text">{serverError}</div>
                  </div>
                )}

                {/* Full Name Field */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Họ và tên <span className="form-label-required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Nguyễn Văn A"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.fullName}
                      {...register('fullName')}
                      className="form-input"
                    />
                  </div>
                  {errors.fullName && (
                    <span className="error-text">{errors.fullName.message}</span>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email <span className="form-label-required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.email}
                      {...register('email')}
                      className="form-input"
                    />
                  </div>
                  {errors.email && (
                    <span className="error-text">{errors.email.message}</span>
                  )}
                </div>

                {/* Farm Name Field */}
                <div className="form-group">
                  <label htmlFor="farmName" className="form-label">
                    Tên trang trại
                    <span className="form-label-optional">(tùy chọn)</span>
                  </label>
                  <div className="input-wrapper">
                    <Input
                      id="farmName"
                      type="text"
                      placeholder="Trang trại Hoa Hồng"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.farmName}
                      {...register('farmName')}
                      className="form-input"
                    />
                  </div>
                  {errors.farmName && (
                    <span className="error-text">{errors.farmName.message}</span>
                  )}
                </div>

                {/* Password Field */}
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu <span className="form-label-required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.password}
                      {...register('password')}
                      className="form-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle-btn"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password ? (
                    <span className="error-text">{errors.password.message}</span>
                  ) : (
                    <span className="hint-text">≥ 8 ký tự, có chữ hoa và số</span>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    Xác nhận mật khẩu <span className="form-label-required">*</span>
                  </label>
                  <div className="input-wrapper">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      disabled={isSubmitting}
                      aria-invalid={!!errors.confirmPassword}
                      {...register('confirmPassword')}
                      className="form-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="password-toggle-btn"
                      tabIndex={-1}
                      aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                    >
                      {showConfirmPassword ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="error-text">{errors.confirmPassword.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn"
                >
                  {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Đang đăng ký...' : 'Đăng ký'}
                </button>

                {/* Sign In Link */}
                <div className="login-link">
                  Đã có tài khoản?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="login-link-btn"
                  >
                    Đăng nhập
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Right Section - Image */}
      <div
        className="image-section"
        style={{
          backgroundImage: `url(${LoginBg})`,
        }}
      />
    </div>
  );
}
