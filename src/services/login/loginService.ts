/**
 * Login Service
 */

import axiosInstance from '../../config/axios';
import { type LoginRequest, type LoginResponse, type ApiResponse } from '../../types';

class LoginService {
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  }
}

export const loginService = new LoginService();
