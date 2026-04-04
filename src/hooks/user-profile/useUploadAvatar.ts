import { useApiMutation } from '../common/useApiMutation';
import { uploadAvatarService } from '../../services/upload-avatar';

/**
 * useUploadAvatar Hook
 * Upload user avatar
 * - File validation
 * - Upload to server
 */
export function useUploadAvatar(onUploadSuccess?: (avatarUrl: string) => void) {
  const { mutate, error, isPending, isSuccess, reset } = useApiMutation(
    (file: File) => uploadAvatarService.uploadAvatar(file),
    {
      onSuccess: (data) => {
        onUploadSuccess?.(data.avatarUrl);
      },
    }
  );

  return {
    uploadAvatar: mutate,
    error,
    isPending,
    isSuccess,
    reset,
  };
}
