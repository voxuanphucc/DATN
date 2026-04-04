/**
 * Login Service
 */

import axiosInstance from '../../config/axios';
import { type LoginRequest, type LoginResponse } from '../../types/login';
import { type ApiResponse } from '../../types/common';

class LoginService {
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  }
}

export const loginService = new LoginService();
