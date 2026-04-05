import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { AlertCircle } from 'lucide-react';
import LogoBrowser from '@/assets/Logo-browser.png';

/**
 * NotFoundPage - 404 Not Found
 * Route không tồn tại
 */
export function NotFoundPage() {
  const navigate = useNavigate();

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

        /* Right Column - Image Section */
        .image-section {
          display: none;
          width: 50%;
          height: 100vh;
          background-image: url('src/assets/login.png');
          background-size: cover;
          background-position: center;
          border-radius: 16px 0 0 16px;
        }

        @media (min-width: 1024px) {
          .image-section {
            display: block;
          }
        }

        .not-found-container {
          width: 100%;
          max-width: 400px;
          text-center;
        }
      `}</style>

      <div className="form-section">
        <button
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

        <div className="not-found-container">
          {/* Icon */}
          <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Trang Không Tồn Tại
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8 leading-relaxed">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-3 justify-center">
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={() => navigate('/')}
            >
              Về Trang Chủ
            </Button>
            <button
              onClick={() => navigate(-1)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Quay Lại
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-xs text-gray-500">
            Nếu bạn có câu hỏi, hãy liên hệ: support@farmerai.vn
          </p>
        </div>
      </div>

      <div className="image-section"></div>
    </div>
  );
}

export default NotFoundPage;
