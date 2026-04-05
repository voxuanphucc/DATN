import { z } from 'zod';
import { AuthResponseSchema } from './base.schemas';

// Base schema cho API request
const BaseRegisterSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  fullName: z.string().min(1, 'Họ và tên không được để trống'),
});

// Schema cho form validation (bao gồm confirmPassword)
const RegisterFormSchema = BaseRegisterSchema.extend({
  confirmPassword: z.string().min(6, 'Xác nhận mật khẩu phải có ít nhất 6 ký tự'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu và xác nhận mật khẩu không trùng nhau',
  path: ['confirmPassword'],
});

// Schema cho API request (không bao gồm confirmPassword)
export const RegisterRequestSchema = BaseRegisterSchema;

// Schema cho form validation (bao gồm confirmPassword)
export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;
export const registerSchema = RegisterFormSchema;

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;

export const RegisterResponseSchema = AuthResponseSchema;
export type RegisterResponse = z.infer<typeof RegisterResponseSchema>;
