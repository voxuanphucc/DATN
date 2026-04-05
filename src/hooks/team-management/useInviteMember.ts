import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteMemberService } from '../../services/invite-member';
import { getProfileService } from '../../services/get-profile';
import { inviteMemberSchema, type InviteMemberFormValues } from '../../lib/schemas/team.schemas';
import { Member, MemberRole } from '../../types/team';

interface UseInviteMemberProps {
  existingMembers: Member[];
  onInviteSuccess: (email: string, role: MemberRole) => void;
}

/**
 * useInviteMember Hook
 * Xử lý logic mời thành viên vào trang trại
 * - Validate email không trùng thành viên hiện tại
 * - Gọi API mời
 * - Xử lý errors
 */
export function useInviteMember({ existingMembers, onInviteSuccess }: UseInviteMemberProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  // Fetch current user email
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await getProfileService.getProfile();
        if (response.success) {
          setCurrentUserEmail(response.data.email);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin user:', error);
      }
    };

    getCurrentUser();
  }, []);

  const form = useForm<InviteMemberFormValues>({
    resolver: zodResolver(inviteMemberSchema),
    defaultValues: {
      email: '',
      role: undefined,
    },
  });

  const onSubmit = async (data: InviteMemberFormValues) => {
    setServerError(null);

    // Validate against current user
    if (currentUserEmail && data.email.toLowerCase() === currentUserEmail.toLowerCase()) {
      form.setError('email', {
        type: 'manual',
        message: 'Không thể tự mời chính mình',
      });
      return;
    }

    // Validate against existing members
    const isExisting = existingMembers.some(
      (m) => m.email.toLowerCase() === data.email.toLowerCase()
    );
    if (isExisting) {
      form.setError('email', {
        type: 'manual',
        message: 'Email này đã là thành viên của trang trại',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await inviteMemberService.inviteMember({
        email: data.email,
        role: data.role as MemberRole,
      });

      if (response.success) {
        onInviteSuccess(data.email, data.role as MemberRole);
        // Reset form
        form.reset();
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage = (error as any).response?.data?.error?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      setServerError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    serverError,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
