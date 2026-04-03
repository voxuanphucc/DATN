/**
 * Get Profile Service
 */

import axiosInstance from '../../config/axios';
import { type UserProfileDto } from '../../types/get-profile';
import { type ApiResponse } from '../../types/common';

class GetProfileService {
  async getProfile(): Promise<ApiResponse<UserProfileDto>> {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  }
}

export const getProfileService = new GetProfileService();
