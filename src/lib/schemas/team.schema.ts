import { z } from 'zod';

/**
 * Team Management Schemas
 * 1. Invite Member: email, role
 * 2. Change Role: role
 */

// ─── Invite Member ───────────────────────────────────────────────────────────
export const inviteMemberSchema = z.object({
  email: z
    .string()
    .min(1, 'Email không được để trống')
    .email('Định dạng email không hợp lệ'),
  role: z
    .enum(['manager', 'employee', 'accountant'] as const, {
      errorMap: () => ({ message: 'Vui lòng chọn một vai trò hợp lệ' }),
    }),
});

export type InviteMemberFormValues = z.infer<typeof inviteMemberSchema>;

// ─── Change Role ─────────────────────────────────────────────────────────────
export const changeRoleSchema = z.object({
  role: z
    .enum(['manager', 'employee', 'accountant'] as const, {
      errorMap: () => ({ message: 'Vui lòng chọn một vai trò hợp lệ' }),
    }),
});

export type ChangeRoleFormValues = z.infer<typeof changeRoleSchema>;
