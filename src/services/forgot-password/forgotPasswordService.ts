/**
 * Forgot Password Service
 */

import axiosInstance from '../../config/axios';
import { type ForgotPasswordRequest, type ForgotPasswordResponse, type ApiResponse } from '../../types';

class ForgotPasswordService {
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<ForgotPasswordResponse>> {
    const response = await axiosInstance.post('/auth/forgot-password', data);
    return response.data;
  }
}

export const forgotPasswordService = new ForgotPasswordService();
