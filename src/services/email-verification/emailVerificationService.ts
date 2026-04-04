/**
 * Email Verification Service
 */

import axiosInstance from '../../config/axios';
import {
  type EmailVerificationRequest,
  type EmailVerificationResponse,
} from '../../types/email-verification';
import { type ApiResponse } from '../../types/common';

class EmailVerificationService {
  async verifyEmail(data: EmailVerificationRequest): Promise<ApiResponse<EmailVerificationResponse>> {
    const response = await axiosInstance.post('/auth/verify-email', data);
    return response.data;
  }

  async resendVerificationEmail(email: string): Promise<ApiResponse<{ message: string }>> {
    const response = await axiosInstance.post('/auth/resend-verification', { email });
    return response.data;
  }
}

export const emailVerificationService = new EmailVerificationService();
