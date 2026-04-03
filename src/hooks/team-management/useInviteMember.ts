import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inviteMemberSchema, type InviteMemberFormValues } from '../../lib/schemas/team.schemas';
import { Member, MemberRole } from '../../types/team';

const CURRENT_USER_EMAIL = 'an.nguyen@example.com';

interface UseInviteMemberProps {
  existingMembers: Member[];
  onInviteSuccess: (email: string, role: MemberRole) => void;
}

export function useInviteMember({ existingMembers, onInviteSuccess }: UseInviteMemberProps) {
  const [serverError, setServerError] = useState<string | null>(null);

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
    if (data.email.toLowerCase() === CURRENT_USER_EMAIL.toLowerCase()) {
      form.setError('email', {
        type: 'manual',
        message: 'Không thể tự mời chính mình',
      });
      return;
    }

    // Validate against existing members
    const isExisting = existingMembers.some(
      (m) => m.email.toLowerCase() === data.email.toLowerCase(),
    );
    if (isExisting) {
      form.setError('email', {
        type: 'manual',
        message: 'Email này đã là thành viên của trang trại',
      });
      return;
    }

    try {
      // TODO: Thay thế mock bằng API thực tế khi backend sẵn sàng
      // await teamApi.inviteMember({ email: data.email, role: data.role });

      // --- MOCK: Xóa khi tích hợp API ---
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // --- HẾT MOCK ---

      onInviteSuccess(data.email, data.role as MemberRole);

      // Reset form
      form.reset();
    } catch {
      setServerError('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
  };

  return {
    form,
    serverError,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
