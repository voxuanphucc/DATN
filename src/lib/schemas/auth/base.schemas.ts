import { z } from 'zod';

/**
 * ════════════════════════════════════════════════════════════════════════════
 * AUTH BASE SCHEMAS - Shared response structures
 * ════════════════════════════════════════════════════════════════════════════
 */

/**
 * Base API response structure used by all auth endpoints
 * Contains: success flag, code, message, data, timestamp
 */
export const AuthResponseSchema = z.object({
  success: z.boolean(),
  code: z.number(),
  message: z.string(),
  data: z.string().optional(), // For register and verify, data is a string message
  timestamp: z.string().datetime(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
