/**
 * Update Profile Service
 */

import axiosInstance from '../../config/axios';
import { type UpdateProfileRequest, type UpdateProfileResponse, type ApiResponse } from '../../types';

class UpdateProfileService {
  async updateProfile(data: UpdateProfileRequest): Promise<ApiResponse<UpdateProfileResponse>> {
    const response = await axiosInstance.put('/users/profile', data);
    return response.data;
  }
}

export const updateProfileService = new UpdateProfileService();
