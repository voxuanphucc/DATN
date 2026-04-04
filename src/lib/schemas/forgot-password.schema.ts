import { z } from 'zod';

/**
 * Forgot Password Form Schema
 * Fields: email
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email không được để trống')
    .email('Định dạng email không hợp lệ'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
