/**
 * ════════════════════════════════════════════════════════════════════════════
 * Refresh Token Service
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * API: POST /api/auth/refresh
 * 
 * Lấy access token mới bằng refresh token
 */

import { axiosInstance, ApiResponse } from './base';
import { RefreshTokenRequestSchema, type RefreshTokenRequest } from '@/lib/schemas/auth/refresh-token.schemas';
import { type LoginData } from '@/lib/schemas/auth/login.schemas';

class RefreshTokenService {
  /**
   * Gọi API refresh token
   * @param data - Refresh token hiện tại
   * @returns Access token và refresh token mới
   */
  async refresh(data: RefreshTokenRequest): Promise<ApiResponse<LoginData>> {
    // Validate dữ liệu đầu vào
    const validatedData = RefreshTokenRequestSchema.parse(data);

    // Gọi API
    const response = await axiosInstance.post('/api/v1/auth/refresh', validatedData);

    // Response data
    return response.data as ApiResponse<LoginData>;
  }
}

export const refreshTokenService = new RefreshTokenService();
