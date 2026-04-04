/**
 * Email Verification API Types
 */

export interface EmailVerificationRequest {
  email: string;
  code: string;
  purpose: 'registration' | 'password_reset';
}

export interface EmailVerificationResponse {
  verified: true;
  token?: string;
}
