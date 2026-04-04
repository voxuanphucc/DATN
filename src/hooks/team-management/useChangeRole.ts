import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changeRoleService } from '../../services/change-role';
import { changeRoleSchema, type ChangeRoleFormValues } from '../../lib/schemas/team.schema';
import { Member, MemberRole } from '../../types/team';

interface UseChangeRoleProps {
  member: Member | null;
  onChangeRoleSuccess: (memberId: string, newRole: MemberRole) => void;
}

/**
 * useChangeRole Hook
 * Xử lý logic thay đổi vai trò của thành viên
 * - Validate member hiện tại
 * - Check không thể thay đổi nếu role giống nhau
 * - Gọi API change role
 * - Callback khi thành công
 */
export function useChangeRole({ member, onChangeRoleSuccess }: UseChangeRoleProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    try {
      const response = await changeRoleService.changeRole({
        memberId: member.id,
        newRole: data.role as MemberRole,
      });

      if (response.success) {
        onChangeRoleSuccess(member.id, data.role as MemberRole);
        // Reset to current state
        form.reset();
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
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
