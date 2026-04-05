import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../../hooks/login/useLogin';
import { useState } from 'react';
import LoginBg from '@/assets/login.png';
import LogoBrowser from '@/assets/Logo-browser.png';

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    form: { register, formState: { errors, isSubmitting } },
    serverError,
    onSubmit,
  } = useLogin();

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

        .form-label-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.625rem;
        }

        .form-label {
          font-weight: 600;
          color: #111827;
          font-size: 0.8rem;
        }

        .forgot-password-btn {
          background: none;
          border: none;
          color: #10b981;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }

        .forgot-password-btn:hover {
          color: #059669;
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

        .remember-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0.8rem 0;
        }

        .remember-checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #10b981;
        }

        .remember-label {
          color: #4b5563;
          font-size: 0.8rem;
          cursor: pointer;
          user-select: none;
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
          margin-top: 0.6rem;
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

        .divider {
          display: flex;
          align-items: center;
          margin: 1rem 0;
          gap: 1rem;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #e5e7eb;
        }

        .divider-text {
          color: #9ca3af;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .social-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .social-btn {
          padding: 0.6rem 0.75rem;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 500;
          color: #374151;
          transition: all 0.2s;
        }

        .social-btn:hover {
          border-color: #10b981;
          background-color: #f0fdf4;
          color: #10b981;
        }

        .signup-section {
          text-align: center;
          color: #6b7280;
          font-size: 0.8rem;
        }

        .signup-link {
          color: #10b981;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          text-decoration: none;
          transition: color 0.2s;
        }

        .signup-link:hover {
          color: #059669;
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
          className="absolute top-0 left-0 p-4 md:p-8 flex items-center gap-2 bg-none border-none cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img
            src={LogoBrowser}
            alt="FarmerAI logo"
            className="h-8 md:h-10 object-contain"
          />
          <span 
            className="font-extrabold text-lg md:text-4xl"
            style={{ color: 'rgba(4, 128, 92, 1)' }}
          >
            farmarAI
          </span>
        </button>
        <div className="form-container">
          {/* Header */}
          <div className="form-header">
            <h1 className="form-title">Chào mừng trở lại!</h1>
            <p className="form-subtitle">Đăng nhập để quản lý trang trại của bạn</p>
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

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <div className="input-wrapper">
                <Input
                  id="email"
                  type="email"
                  placeholder="nhập email của bạn"
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

            {/* Password Field */}
            <div className="form-group">
              <div className="form-label-wrapper">
                <label htmlFor="password" className="form-label">Mật khẩu</label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="forgot-password-btn"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <div className="input-wrapper">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="nhập mật khẩu của bạn"
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
              {errors.password && (
                <span className="error-text">{errors.password.message}</span>
              )}
            </div>

            {/* Remember Me */}
            <div className="remember-group mt-8">
              <input
                type="checkbox"
                id="remember"
                className="remember-checkbox"
                defaultChecked
              />
              <label htmlFor="remember" className="remember-label">
                Ghi nhớ tôi trong 30 ngày
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>

            {/* Divider */}
            <div className="divider">
              <div className="divider-line" />
              <div className="divider-text">hoặc</div>
              <div className="divider-line" />
            </div>

            {/* Social Buttons */}
          

            {/* Sign Up Link */}
            <div className="signup-section">
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="signup-link"
              >
                Đăng ký ngay
              </button>
            </div>
          </form>
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
