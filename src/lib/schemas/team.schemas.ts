import { z } from 'zod';

/**
 * ════════════════════════════════════════════════════════════════════════════
 * TEAM SCHEMAS
 * ════════════════════════════════════════════════════════════════════════════
 */

export const ChangeRoleSchema = z.object({
  role: z.enum(['manager', 'employee'], {
    errorMap: () => ({ message: 'Vai trò không hợp lệ' }),
  }),
});

export type ChangeRoleFormValues = z.infer<typeof ChangeRoleSchema>;

// Backward compatibility alias
export const changeRoleSchema = ChangeRoleSchema;

export const InviteMemberSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  role: z.enum(['manager', 'employee'], {
    errorMap: () => ({ message: 'Vai trò không hợp lệ' }),
  }),
});

export type InviteMemberFormValues = z.infer<typeof InviteMemberSchema>;

// Backward compatibility alias
export const inviteMemberSchema = InviteMemberSchema;
