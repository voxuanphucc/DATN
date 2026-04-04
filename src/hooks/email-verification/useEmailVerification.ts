import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { emailVerificationService } from '../../services/email-verification';

type VerificationStatus = 'loading' | 'success' | 'error';

/**
 * useEmailVerification Hook
 * Xác thực email dựa vào token từ URL params
 * - Tự động verify email khi component mount
 * - Hỗ trợ resend verification email
 */
export function useEmailVerification() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      // Nếu không có token, set error
      if (!token) {
        setStatus('error');
        setErrorMessage('Token xác thực không hợp lệ');
        return;
      }

      try {
        const response = await emailVerificationService.verifyEmail({
          email: email || '',
          code: token,
          purpose: 'registration',
        });

        if (response.success) {
          setStatus('success');
        } else {
          setStatus('error');
          setErrorMessage('Không thể xác thực email. Vui lòng thử lại.');
        }
      } catch (error: any) {
        setStatus('error');
        const message =
          error.response?.data?.error?.message || 'Đã có lỗi xảy ra khi xác thực email.';
        setErrorMessage(message);
      }
    };

    verifyToken();
  }, [token, email]);

  const handleResendEmail = async () => {
    setIsResending(true);
    setErrorMessage(null);

    try {
      if (!email) {
        setErrorMessage('Email không hợp lệ');
        return;
      }

      const response = await emailVerificationService.resendVerificationEmail(email);

      if (response.success) {
        alert('Email xác thực đã được gửi lại! Vui lòng kiểm tra hộp thư của bạn.');
      }
    } catch (error: any) {
      const message =
        error.response?.data?.error?.message || 'Không thể gửi lại email. Vui lòng thử lại.';
      setErrorMessage(message);
    } finally {
      setIsResending(false);
    }
  };

  return {
    token,
    email,
    status,
    isResending,
    errorMessage,
    handleResendEmail,
  };
}
