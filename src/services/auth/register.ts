/**
 * ════════════════════════════════════════════════════════════════════════════
 * Register Service
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * API: POST /api/auth/register
 * 
 * Tạo tài khoản mới với email, password, và full name
 */

import { axiosInstance, ApiResponse } from './base';
import { RegisterRequestSchema, type RegisterRequest } from '@/lib/schemas/auth/register.schemas';

class RegisterService {
  /**
   * Gọi API register
   * @param data - Email, password, fullName, optional farmName
   * @returns Success message, user sẽ nhận verification email
   */
  async register(data: RegisterRequest): Promise<ApiResponse<string>> {
    // Validate dữ liệu đầu vào
    const validatedData = RegisterRequestSchema.parse(data);

    // Gọi API
    const response = await axiosInstance.post('/api/v1/auth/register', validatedData);

    
    // Response data
    return response.data as ApiResponse<string>;
  }
}

export const registerService = new RegisterService();
