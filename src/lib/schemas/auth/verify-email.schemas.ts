import { z } from 'zod';
import { AuthResponseSchema } from './base.schemas';

/**
 * ════════════════════════════════════════════════════════════════════════════
 * VERIFY EMAIL SCHEMAS
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Verify email endpoint: POST /api/auth/verify
 * Verifies email with token from email
 */

export const VerifyEmailRequestSchema = z.object({
  token: z.string().min(1, 'Token không được để trống'),
});

export type VerifyEmailRequest = z.infer<typeof VerifyEmailRequestSchema>;

export const VerifyEmailResponseSchema = AuthResponseSchema;
export type VerifyEmailResponse = z.infer<typeof VerifyEmailResponseSchema>;
