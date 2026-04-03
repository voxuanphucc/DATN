import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changeRoleSchema, type ChangeRoleFormValues } from '../../lib/schemas/team.schemas';
import { Member, MemberRole } from '../../types/team';

interface UseChangeRoleProps {
  member: Member | null;
  onChangeRoleSuccess: (memberId: string, newRole: MemberRole) => void;
}

export function useChangeRole({ member, onChangeRoleSuccess }: UseChangeRoleProps) {
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ChangeRoleFormValues>({
    resolver: zodResolver(changeRoleSchema),
    defaultValues: {
      role: (member?.role !== 'owner' ? member?.role : undefined) as any,
    },
  });

  // Update default value when member changes
  useEffect(() => {
    if (member && member.role !== 'owner') {
      form.reset({
        role: member.role as any,
      });
    }
  }, [member, form]);

  const onSubmit = async (data: ChangeRoleFormValues) => {
    setServerError(null);

    if (!member) {
      setServerError('Thông tin thành viên không hợp lệ');
      return;
    }

    // No change needed
    if (data.role === member.role) {
      return;
    }

    try {
      // TODO: Thay thế mock bằng API thực tế khi backend sẵn sàng
      // await teamApi.changeRole({ memberId: member.id, newRole: data.role });

      // --- MOCK: Xóa khi tích hợp API ---
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // --- HẾT MOCK ---

      onChangeRoleSuccess(member.id, data.role as MemberRole);

      // Reset to current state
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
