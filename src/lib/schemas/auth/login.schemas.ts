import { z } from 'zod';
import { AuthResponseSchema } from './base.schemas';

/**
 * ════════════════════════════════════════════════════════════════════════════
 * LOGIN SCHEMAS
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Login endpoint: POST /api/auth/login
 * Returns: accessToken, refreshToken
 */

export const LoginRequestSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginDataSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginData = z.infer<typeof LoginDataSchema>;

export const LoginResponseSchema = AuthResponseSchema.extend({
  data: LoginDataSchema.optional(), // For login and refresh, data is an object with tokens
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

// Backward compatibility alias
export const loginSchema = LoginRequestSchema;
export type LoginFormValues = LoginRequest;
