/**
 * Register Service
 */

import axiosInstance from '../../config/axios';
import { type RegisterRequest, type RegisterResponse } from '../../types/register';
import { type ApiResponse } from '../../types/common';

class RegisterService {
  async register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  }
}

export const registerService = new RegisterService();
