import { useApiMutation } from '../common/useApiMutation';
import { useAuthStore } from '../../store/slices/authStore';
import { updateProfileService } from '../../services/update-profile';
import { type UpdateProfileRequest } from '../../types/update-profile';

/**
 * useUpdateProfile Hook
 * Update user profile (fullName, avatar, farmName) & sync with authStore
 * - Gọi API update
 * - Cập nhật user vào authStore khi thành công
 * - Xử lý loading, error, success states
 */
export function useUpdateProfile(onUpdateSuccess?: () => void) {
  const { setUser } = useAuthStore();

  const { mutate, error, isPending, isSuccess, reset } = useApiMutation(
    (data: UpdateProfileRequest) => updateProfileService.updateProfile(data),
    {
      onSuccess: (response) => {
        // Cập nhật user profile vào store
        if (response?.data) {
          setUser(response.data);
        }
        onUpdateSuccess?.();
      },
    }
  );

  return {
    updateProfile: mutate,
    error,
    isPending,
    isSuccess,
    reset,
  };
}
