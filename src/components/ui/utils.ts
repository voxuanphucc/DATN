import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Role} from '../../types/auth';

// ─── Tailwind class merger ────────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


/** Map role → nhãn tiếng Việt */
export function getRoleLabel(role: Role): string {
  const labels: Record<Role, string> = {
    farmer: 'Nông dân',
    manager: 'Quản lý',
    employee: 'Nhân viên',
  };
  return labels[role] ?? role;
}

