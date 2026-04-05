/**
 * Email Verification Service
 * 
 * Note: Uses the simple token-based verification endpoint from API spec
 * POST /api/v1/auth/verify with { token: string }
 */

import axiosInstance from '../../config/axios';
import {
  type EmailVerificationRequest,
  type EmailVerificationResponse,
  type ApiResponse,
} from '../../types';

class EmailVerificationService {
  /**
   * Verify email using token from verification link
   * @param data - Must include email and code (token from URL)
   * @returns Success response
   */
  async verifyEmail(data: EmailVerificationRequest): Promise<ApiResponse<EmailVerificationResponse>> {
    // Convert email verification request to simple token format for API
    const response = await axiosInstance.post('/api/v1/auth/verify', { 
      token: data.code 
    });
    return response.data;
  }

  /**
   * Resend verification email
   * @param email - Email address to resend verification to
   * @returns Success response with message
   */
  async resendVerificationEmail(email: string): Promise<ApiResponse<{ message: string }>> {
    try {
      // Send email to resend verification code
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
