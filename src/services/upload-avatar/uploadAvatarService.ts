/**
 * Upload Avatar Service
 */

import axiosInstance from '../../config/axios';
import { type UploadAvatarResponse } from '../../types/upload-avatar';
import { type ApiResponse } from '../../types/common';

class UploadAvatarService {
  async uploadAvatar(file: File): Promise<ApiResponse<UploadAvatarResponse>> {
    const formData = new FormData();
    formData.append('avatar', file);
    const response = await axiosInstance.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export const uploadAvatarService = new UploadAvatarService();
