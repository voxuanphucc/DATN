import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { acceptInvitationService } from '../../services/accept-invitation';
import { type InvitationDto } from '../../types/get-invitations';

/**
 * useAcceptInvitation Hook
 * Xử lý flow chấp nhận lời mời vào trang trại
 * - Verify invitation token từ URL
 * - Nếu có tài khoản: nhập mật khẩu để accept
 * - Nếu chưa có: nhập fullName + password để tạo tài khoản + accept
 */

interface AcceptInvitationSchema {
  email?: string;
  fullName?: string;
  password?: string;
}

type InvitationState = 'loading' | 'valid' | 'invalid' | 'already_accepted';

export function useAcceptInvitation() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [invitationState, setInvitationState] = useState<InvitationState>('loading');
  const [invitation, setInvitation] = useState<InvitationDto | null>(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState<string | null>(null);
  const [hasAccount, setHasAccount] = useState<boolean | null>(null);

  const form = useForm<AcceptInvitationSchema>({
    defaultValues: {
      email: email || '',
      fullName: '',
      password: '',
    },
  });

  // Verify invitation token
  useEffect(() => {
    const verifyInvitation = async () => {
      if (!token) {
        setInvitationState('invalid');
        return;
      }

      try {
        const response = await acceptInvitationService.verifyInvitation(token);

        if (response.success) {
          setInvitation(response.data);
          setInvitationState('valid');
          //TODO: Check nếu user đã đăng nhập hoặc email từ invitation
          // Tạm thời set hasAccount = false (cần có profile check từ backend)
          setHasAccount(false);
        }
      } catch (error: unknown) {
        const status = (error as Record<string, unknown>)?.response?.status;
        if (status === 410) {
          setInvitationState('already_accepted');
        } else {
          setInvitationState('invalid');
        }
      }
    };

    verifyInvitation();
  }, [token]);

  const onSubmit = async (data: AcceptInvitationSchema) => {
    setAcceptError(null);

    if (!token || !invitation) {
      setAcceptError('Lời mời không hợp lệ');
      return;
    }

    setIsAccepting(true);

    try {
      const response = await acceptInvitationService.acceptInvitation({
        token,
        email: data.email || invitation.email,
        fullName: data.fullName,
        password: data.password,
      });

      if (response.success) {
        // Lưu token nếu backend trả về
        if (response.data.token) {
          localStorage.setItem('accessToken', response.data.token);
        }
        // Redirect được handled ở component level với useEffect
        return response.data;
      }
    } catch (error: unknown) {
      const errorMessage =
        (error as Record<string, unknown>)?.response?.data?.error?.message ||
        'Không thể chấp nhận lời mời. Vui lòng thử lại.';
      setAcceptError(errorMessage);
    } finally {
      setIsAccepting(false);
    }
  };

  return {
    token,
    email,
    invitation,
    invitationState,
    hasAccount,
    form,
    acceptError,
    isAccepting,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
