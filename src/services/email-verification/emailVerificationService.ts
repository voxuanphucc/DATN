/**
 * Email Verification Service
 */

import axiosInstance from '../../config/axios';
import {
  type EmailVerificationRequest,
  type EmailVerificationResponse,
  type ApiResponse,
} from '../../types';

class EmailVerificationService {
  async verifyEmail(data: EmailVerificationRequest): Promise<ApiResponse<EmailVerificationResponse>> {
    const response = await axiosInstance.post('/auth/verify-email', data);
    return response.data;
  }

  async resendVerificationEmail(email: string): Promise<ApiResponse<{ message: string }>> {
    try {
      // Gửi email verification lại bằng cách POST email đến /api/v1/auth/verify
      const response = await axiosInstance.post('/api/v1/auth/verify', { email });
      return response.data;
    } catch (error) {
      console.error('Resend verification email error:', {
        status: (error as any)?.response?.status,
        data: (error as any)?.response?.data,
        message: (error as any)?.message
      });
      throw error;
    }
  }
}

export const emailVerificationService = new EmailVerificationService();
