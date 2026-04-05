/**
 * ════════════════════════════════════════════════════════════════════════════
 * Verify Email Service
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * API: POST /api/auth/verify
 * 
 * Xác thực email bằng token được gửi đến email
 */

import { axiosInstance, ApiResponse } from './base';
import { VerifyEmailRequestSchema, type VerifyEmailRequest } from '@/lib/schemas/auth/verify-email.schemas';

class VerifyEmailService {
  /**
   * Gọi API verify email
   * @param data - Token từ email verification link
   * @returns Success message khi email đã được xác thực
   */
  async verify(data: VerifyEmailRequest): Promise<ApiResponse<string>> {
    // Validate dữ liệu đầu vào
    const validatedData = VerifyEmailRequestSchema.parse(data);

    // Gọi API
    const response = await axiosInstance.post('/api/v1/auth/verify', validatedData);

    // Response data
    return response.data as ApiResponse<string>;
  }
}

export const verifyEmailService = new VerifyEmailService();
