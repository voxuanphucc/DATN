/**
 * Login API Types
 */

import { type UserProfileDto } from '../get-profile';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: UserProfileDto;
}
