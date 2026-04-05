import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { emailVerificationService } from '../../services/email-verification';

type VerificationStatus = 'loading' | 'success' | 'error';

/**
 * useEmailVerification Hook
 * Xác thực email dựa vào token từ URL params
 * - Tự động verify email khi component mount
 * - Hỗ trợ resend verification email
 * @param emailFromProps - Email được truyền từ route state (sau khi đăng ký)
 */
export function useEmailVerification(emailFromProps?: string) {
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get('token');
  const emailFromUrl = searchParams.get('email');
  

  const email = emailFromProps || emailFromUrl;

  const [status, setStatus] = useState<VerificationStatus>('loading');
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      // Nếu không có token từ URL, chỉ chờ user nhấn "Gửi lại email" hoặc nhấn link từ email
      if (!tokenFromUrl) {
        // Nếu có email từ props (vừa đăng ký), hiển thị thông báo chờ
        if (emailFromProps) {
          setStatus('loading');
          setErrorMessage('Vui lòng kiểm tra email và nhấp vào liên kết xác thực.');
        } else {
          setStatus('error');
          setErrorMessage('Token xác thực không hợp lệ');
        }
        return;
      }

      try {
        const response = await emailVerificationService.verifyEmail({
          email: email || '',
          code: tokenFromUrl,
          purpose: 'registration',
        });

        if (response.success) {
          setStatus('success');
        } else {
          setStatus('error');
          setErrorMessage('Không thể xác thực email. Vui lòng thử lại.');
        }
      } catch (error) {
        setStatus('error');
        const message = axios.isAxiosError(error)
          ? error.response?.data?.error?.message || 'Đã có lỗi xảy ra khi xác thực email.'
          : 'Đã có lỗi xảy ra khi xác thực email.';
        setErrorMessage(message);
      }
    };

    verifyToken();
  }, [tokenFromUrl, email, emailFromProps]);

  const handleResendEmail = async () => {
    setIsResending(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      if (!email) {
        setErrorMessage('Email không hợp lệ');
        setIsResending(false);
        return;
      }

      const response = await emailVerificationService.resendVerificationEmail(email);

      if (response.success) {
        // Hiển thị thông báo thành công
        setSuccessMessage('Email xác thực đã được gửi lại! Vui lòng kiểm tra hộp thư của bạn.');
        
        // Tự động ẩn thông báo sau 3 giây
        const timer = setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
        
        return () => clearTimeout(timer);
      } else {
        setErrorMessage('Không thể gửi lại email. Vui lòng thử lại.');
      }
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error?.message || 'Không thể gửi lại email. Vui lòng thử lại.'
        : 'Không thể gửi lại email. Vui lòng thử lại.';
      setErrorMessage(message);
    } finally {
      setIsResending(false);
    }
  };

  return {
    status,
    isResending,
    errorMessage,
    successMessage,
    handleResendEmail,
  };
}
