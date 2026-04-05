/**
 * Reset Password Service
 */

import axiosInstance from '../../config/axios';
import { type ResetPasswordRequest, type ResetPasswordResponse, type ApiResponse } from '../../types';

class ResetPasswordService {
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<ResetPasswordResponse>> {
    const response = await axiosInstance.post('/auth/reset-password', data);
    return response.data;
  }
}

export const resetPasswordService = new ResetPasswordService();
