import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { AlertCircle } from 'lucide-react';

/**
 * ForbiddenPage - 403 Forbidden
 * User không có quyền truy cập route này
 */
export function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 px-4">
      <div className="max-w-md text-center">
        {/* Icon */}
        <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Access Denied
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Bạn không có quyền truy cập trang này. Vui lòng liên hệ với quản trị viên nếu bạn cho rằng đây là lỗi.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Quay Lại
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate('/dashboard')}
          >
            Về Dashboard
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-500">
          Nếu bạn có câu hỏi, hãy liên hệ: support@farmerai.vn
        </p>
      </div>
    </div>
  );
}

export default ForbiddenPage;
