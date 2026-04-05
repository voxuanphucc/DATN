import { z } from 'zod';
import { AuthResponseSchema } from './base.schemas';

/**
 * ════════════════════════════════════════════════════════════════════════════
 * RESET PASSWORD SCHEMAS
 * ════════════════════════════════════════════════════════════════════════════
 */

export const ResetPasswordRequestSchema = z
  .object({
    token: z.string().min(1, 'Token không được trống'),
    newPassword: z.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Xác nhận mật khẩu phải có ít nhất 6 ký tự'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu mới không khớp',
    path: ['confirmPassword'],
  });

export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;

export const ResetPasswordResponseSchema = AuthResponseSchema.extend({
  data: z.string().optional(),
});

export type ResetPasswordResponse = z.infer<typeof ResetPasswordResponseSchema>;

// Backward compatibility alias
export const resetPasswordSchema = ResetPasswordRequestSchema;
export type ResetPasswordFormValues = ResetPasswordRequest;
