/**
 * Change Password Service
 */

import axiosInstance from '../../config/axios';
import { type ChangePasswordRequest, type ChangePasswordResponse, type ApiResponse } from '../../types';

class ChangePasswordService {
  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<ChangePasswordResponse>> {
    const response = await axiosInstance.post('/users/change-password', data);
    return response.data;
  }
}

export const changePasswordService = new ChangePasswordService();
