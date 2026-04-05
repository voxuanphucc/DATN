/**
 * ════════════════════════════════════════════════════════════════════════════
 * Login Service
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * API: POST /api/auth/login
 * 
 * Cung cấp access token và refresh token + user profile
 */

import { axiosInstance, ApiResponse } from './base';
import { LoginRequestSchema, type LoginRequest, type LoginData } from '@/lib/schemas/auth/login.schemas';

class LoginService {
  /**
   * Gọi API login
   * @param data - Email và password
   * @returns Access token, refresh token, và user profile
   */
  async login(data: LoginRequest): Promise<ApiResponse<LoginData>> {
    // Validate dữ liệu đầu vào
    const validatedData = LoginRequestSchema.parse(data);

    // Gọi API
    const response = await axiosInstance.post('/api/v1/auth/login', validatedData);

    // Response data đã được validate bởi axios interceptor
    return response.data as ApiResponse<LoginData>;
  }
}

export const loginService = new LoginService();
