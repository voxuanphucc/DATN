/**
 * Forgot Password API Types
 */

export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  resetKeyExpiry: string;
}
