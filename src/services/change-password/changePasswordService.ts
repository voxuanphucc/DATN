/**
 * Change Password Service
 */

import axiosInstance from '../../config/axios';
import { type ChangePasswordRequest, type ChangePasswordResponse } from '../../types/change-password';
import { type ApiResponse } from '../../types/common';

class ChangePasswordService {
  async changePassword(data: ChangePasswordRequest): Promise<ApiResponse<ChangePasswordResponse>> {
    const response = await axiosInstance.post('/users/change-password', data);
    return response.data;
  }
}

export const changePasswordService = new ChangePasswordService();
