/**
 * Reset Password API Types
 */

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
  redirectUrl?: string;
}
