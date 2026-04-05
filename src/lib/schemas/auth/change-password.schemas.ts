import { z } from 'zod';
import { AuthResponseSchema } from './base.schemas';

/**
 * ════════════════════════════════════════════════════════════════════════════
 * CHANGE PASSWORD SCHEMAS
 * ════════════════════════════════════════════════════════════════════════════
 */

export const ChangePasswordRequestSchema = z
  .object({
    currentPassword: z.string().min(1, 'Mật khẩu hiện tại không được trống'),
    newPassword: z.string().min(6, 'Mật khẩu mới phải có ít nhất 6 ký tự'),
    confirmPassword: z.string().min(6, 'Xác nhận mật khẩu phải có ít nhất 6 ký tự'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu mới không khớp',
    path: ['confirmPassword'],
  });

export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>;

export const ChangePasswordResponseSchema = AuthResponseSchema.extend({
  data: z.string().optional(),
});

export type ChangePasswordResponse = z.infer<typeof ChangePasswordResponseSchema>;

// Backward compatibility alias
export const changePasswordSchema = ChangePasswordRequestSchema;
export type ChangePasswordFormValues = ChangePasswordRequest;
