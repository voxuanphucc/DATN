/**
 * Register API Types
 */

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  farmName?: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
  fullName: string;
  requiresEmailVerification: boolean;
}
