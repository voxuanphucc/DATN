import { z } from 'zod';
import { LoginResponseSchema } from './login.schemas';

/**
 * ════════════════════════════════════════════════════════════════════════════
 * REFRESH TOKEN SCHEMAS
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Refresh token endpoint: POST /api/auth/refresh
 * Returns: new accessToken and refreshToken
 */

export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh Token không được để trống'),
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;

// Same structure as LoginResponse
export const RefreshTokenResponseSchema = LoginResponseSchema;
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResponseSchema>;
