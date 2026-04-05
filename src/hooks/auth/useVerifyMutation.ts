/**
 * ════════════════════════════════════════════════════════════════════════════
 * useVerifyMutation Hook
 * ════════════════════════════════════════════════════════════════════════════
 * 
 * Custom hook để quản lý email verification mutation với React Query
 */

import { useMutation } from '@tanstack/react-query';
import { verifyEmailService } from '@/services/auth/verify';
import type { VerifyEmailRequest } from '@/lib/schemas/auth/verify-email.schemas';

export const useVerifyMutation = () => {
  return useMutation({
    mutationFn: async (data: VerifyEmailRequest) => {
      return verifyEmailService.verify(data);
    },
  });
};
