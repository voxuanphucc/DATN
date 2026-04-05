import { z } from 'zod';
import { AuthResponseSchema } from './base.schemas';

/**
 * ════════════════════════════════════════════════════════════════════════════
 * FORGOT PASSWORD SCHEMAS
 * ════════════════════════════════════════════════════════════════════════════
 */

export const ForgotPasswordRequestSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>;

export const ForgotPasswordResponseSchema = AuthResponseSchema.extend({
  data: z.string().optional(),
});

export type ForgotPasswordResponse = z.infer<typeof ForgotPasswordResponseSchema>;

// Backward compatibility alias
export const forgotPasswordSchema = ForgotPasswordRequestSchema;
export type ForgotPasswordFormValues = ForgotPasswordRequest;
