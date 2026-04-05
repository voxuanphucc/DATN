/**
 * Get Profile Service
 */

import axiosInstance from '../../config/axios';
import { type UserProfileDto, type ApiResponse } from '../../types';

class GetProfileService {
  async getProfile(): Promise<ApiResponse<UserProfileDto>> {
    const response = await axiosInstance.get('/users/profile');
    return response.data;
  }
}

export const getProfileService = new GetProfileService();
