import { useApiMutation } from '../common/useApiMutation';
import { removeMemberService } from '../../services/remove-member';

/**
 * useRemoveMember Hook
 * Xóa thành viên khỏi trang trại
 * - Gọi API xóa member
 * - Xử lý loading, error, success states
 */
export function useRemoveMember(onRemoveSuccess?: (memberId: string) => void) {
  const { mutate, error, isPending, isSuccess, reset } = useApiMutation(
    (memberId: string) => removeMemberService.removeMember({ memberId }),
    {
      onSuccess: (data) => {
        onRemoveSuccess?.(data.removedMemberId);
      },
    }
  );

  return {
    removeMember: mutate,
    error,
    isPending,
    isSuccess,
    reset,
  };
}
