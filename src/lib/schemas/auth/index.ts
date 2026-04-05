/**
 * ════════════════════════════════════════════════════════════════════════════
 * AUTH SCHEMAS - Central Export
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * All authentication-related API schemas organized by endpoint
 */

// Base schemas (shared)
export * from './base.schemas';

// Login
export * from './login.schemas';

// Register
export * from './register.schemas';

// Verify Email
export * from './verify-email.schemas';

// Refresh Token
export * from './refresh-token.schemas';

// Change Password
export * from './change-password.schemas';

// Forgot Password
export * from './forgot-password.schemas';

// Reset Password
export * from './reset-password.schemas';

/**
 * All auth request schemas as a namespace
 * Usage: AuthSchemas.Login, AuthSchemas.Register, etc.
 */
export const AuthSchemas = {
  Login: async () =>
    (await import('./login.schemas')).LoginRequestSchema,
  Register: async () =>
    (await import('./register.schemas')).RegisterRequestSchema,
  VerifyEmail: async () =>
    (await import('./verify-email.schemas')).VerifyEmailRequestSchema,
  RefreshToken: async () =>
    (await import('./refresh-token.schemas')).RefreshTokenRequestSchema,
};
