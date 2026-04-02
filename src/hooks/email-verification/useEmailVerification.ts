import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

// ---------------------------------------------------------
// TODO: Thay thế mock bằng API thực tế khi backend sẵn sàng
// import { authApi } from '../../services/api/authApi';
// ---------------------------------------------------------

type VerificationStatus = 'loading' | 'success' | 'error';

export function useEmailVerification() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // TODO: Thay thế đoạn mock dưới bằng API call thực tế:
        // const response = await authApi.verifyEmail({ token });
        // setStatus(response.success ? 'success' : 'error');

        // --- MOCK: Xóa khi tích hợp API ---
        await new Promise((resolve) => setTimeout(resolve, 2000));

        if (!token || token === 'expired') {
          setStatus('error');
        } else {
          setStatus('success');
        }
        // --- HẾT MOCK ---
      } catch {
        setStatus('error');
      }
    };

    verifyToken();
  }, [token]);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      // TODO: Thay thế đoạn mock dưới bằng API call thực tế:
      // await authApi.resendVerificationEmail();

      // --- MOCK: Xóa khi tích hợp API ---
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // --- HẾT MOCK ---

      // Reset lại trạng thái để thông báo thành công
      alert('Email xác thực đã được gửi lại!');
    } catch {
      alert('Không thể gửi lại email. Vui lòng thử lại.');
    } finally {
      setIsResending(false);
    }
  };

  return {
    token,
    status,
    isResending,
    handleResendEmail,
  };
}
