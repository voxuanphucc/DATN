import { useApiMutation } from '../common/useApiMutation';
import { changePasswordService } from '../../services/change-password';

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

/**
 * useChangePassword Hook
 * Change user password
 * - Verify current password
 * - Update to new password
 */
export function useChangePassword(onChangeSuccess?: () => void) {
  const { mutate, error, isPending, isSuccess, reset } = useApiMutation(
    (data: ChangePasswordData) => changePasswordService.changePassword(data),
    {
      onSuccess: () => {
        onChangeSuccess?.();
      },
    }
  );

  return {
    changePassword: mutate,
    error,
    isPending,
    isSuccess,
    reset,
  };
}
