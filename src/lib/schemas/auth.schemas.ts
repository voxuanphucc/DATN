import { z } from 'zod';

// ─── Login ───────────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email không được để trống')
    .email('Định dạng email không hợp lệ'),
  password: z
    .string()
    .min(1, 'Mật khẩu không được để trống'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// ─── Register ─────────────────────────────────────────────────────────────────
// Spec PB01: fullName, email, password, confirmPassword, farmName (tùy chọn)
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Họ và tên không được để trống')
      .min(2, 'Họ và tên phải có ít nhất 2 ký tự')
      .max(100, 'Họ và tên không được quá 100 ký tự'),
    email: z
      .string()
      .min(1, 'Email không được để trống')
      .email('Định dạng email không hợp lệ'),
    farmName: z
      .string()
      .max(100, 'Tên trang trại không được quá 100 ký tự')
      .optional(),
    password: z
      .string()
      .min(1, 'Mật khẩu không được để trống')
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa')
      .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 chữ số'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

// ─── Forgot Password ─────────────────────────────────────────────────────────
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'Email không được để trống')
    .email('Định dạng email không hợp lệ'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// ─── Reset Password ───────────────────────────────────────────────────────────
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa')
      .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất 1 chữ số'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// ─── Change Password (when logged in) ──────────────────────────────────────────
// Spec (PB03): Đổi mật khẩu khi đang đăng nhập
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, 'Mật khẩu hiện tại không được để trống'),
    newPassword: z
      .string()
      .min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự')
      .regex(/[A-Z]/, 'Mật khẩu mới phải chứa ít nhất 1 chữ hoa')
      .regex(/[0-9]/, 'Mật khẩu mới phải chứa ít nhất 1 chữ số'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu mới'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: 'Mật khẩu mới phải khác mật khẩu cũ',
    path: ['newPassword'],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
