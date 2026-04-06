import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useEmailVerification } from '../../hooks/email-verification/useEmailVerification';
import LoginBg from '@/assets/login.png';
import LogoBrowser from '@/assets/Logo-browser.png';

export function EmailVerificationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromState = (location.state as { email?: string })?.email;
  const { status, isResending, errorMessage, successMessage, handleResendEmail } = useEmailVerification(emailFromState);

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

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          py-8;
          text-align: center;
        }

        .success-alert {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 0.75rem 0.875rem;
          margin-bottom: 1rem;
          display: flex;
          gap: 0.6rem;
          align-items: flex-start;
        }

        .success-alert-icon {
          color: #22c55e;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .success-alert-text {
          color: #166534;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .error-alert {
          background: #fee2e2;
          border: 1px solid #fca5a5;
          border-radius: 8px;
          padding: 0.75rem 0.875rem;
          margin-bottom: 1rem;
          display: flex;
          gap: 0.6rem;
          align-items: flex-start;
        }

        .error-alert-icon {
          color: #dc2626;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .error-alert-text {
          color: #7f1d1d;
          font-size: 0.8rem;
          font-weight: 500;
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

        .back-btn {
          width: 100%;
          padding: 0.7rem 1.25rem;
          background: white;
          color: #10b981;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 0.6rem;
        }

        .back-btn:hover {
          background: #f9fafb;
          border-color: #10b981;
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
          {status === 'loading' && (
            <>
              <div className="form-header">
                <h1 className="form-title">Xác thực Email</h1>
                <p className="form-subtitle">Đang kiểm tra thông tin xác thực của bạn...</p>
              </div>
              <div className="loading-container" style={{ paddingTop: '2rem', paddingBottom: '2rem', textAlign: 'center' }}>
                {successMessage && (
                  <div className="success-alert" style={{ marginBottom: '1rem' }}>
                    <CheckCircle2 className="success-alert-icon h-5 w-5" />
                    <div className="success-alert-text">{successMessage}</div>
                  </div>
                )}
                {errorMessage ? (
                  <>
                    <p style={{ color: '#059669', fontSize: '0.95rem', fontWeight: '500', marginBottom: '1rem' }}>
                      {errorMessage}
                    </p>
                    <button
                      type="button"
                      onClick={handleResendEmail}
                      disabled={isResending}
                      className="submit-btn"
                    >
                      {isResending && <Loader2 className="h-4 w-4 animate-spin" />}
                      {isResending ? 'Đang gửi...' : 'Gửi lại email xác thực'}
                    </button>
                  </>
                ) : (
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    Đang xác thực email của bạn...
                  </p>
                )}
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="form-header">
                <h1 className="form-title">Hoàn thành!</h1>
                <p className="form-subtitle">Email của bạn đã được xác thực</p>
              </div>
              <div className="success-alert">
                <CheckCircle2 className="success-alert-icon h-5 w-5" />
                <div className="success-alert-text">
                  Xác thực email thành công! Tài khoản của bạn đã được kích hoạt và trang trại mặc định đã được tạo.
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="submit-btn"
              >
                Đăng nhập ngay
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="form-header">
                <h1 className="form-title">Lỗi xác thực</h1>
                <p className="form-subtitle">Không thể hoàn thành xác thực email</p>
              </div>
              <div className="error-alert">
                <XCircle className="error-alert-icon h-5 w-5" />
                <div className="error-alert-text">
                  Liên kết xác thực đã hết hạn hoặc không hợp lệ.
                </div>
              </div>
              <button
                type="button"
                onClick={handleResendEmail}
                disabled={isResending}
                className="submit-btn"
              >
                {isResending && <Loader2 className="h-4 w-4 animate-spin" />}
                {isResending ? 'Đang gửi...' : 'Gửi lại email xác thực'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="back-btn"
              >
                Quay lại đăng nhập
              </button>
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
