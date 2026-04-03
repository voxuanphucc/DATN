import { z } from 'zod';

// Allowed roles for team management (excludes 'owner')
export type AssignableRole = 'manager' | 'employee' | 'accountant';

// ─── Invite Member ────────────────────────────────────────────────────────────
export const inviteMemberSchema = z.object({
  email: z
    .string()
    .min(1, 'Email không được để trống')
    .email('Định dạng email không hợp lệ'),
  role: z.enum(['manager', 'employee', 'accountant'] as const, {
    message: 'Vui lòng chọn vai trò',
  }),
});

export type InviteMemberFormValues = z.infer<typeof inviteMemberSchema>;

// ─── Change Role ──────────────────────────────────────────────────────────────
export const changeRoleSchema = z.object({
  role: z.enum(['manager', 'employee', 'accountant'] as const, {
    message: 'Vui lòng chọn vai trò',
  }),
});

export type ChangeRoleFormValues = z.infer<typeof changeRoleSchema>;
