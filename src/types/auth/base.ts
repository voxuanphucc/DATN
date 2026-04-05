

import type { ApiResponse } from '../../services/auth/base';

export type { AuthResponse } from '../../lib/schemas/auth/base.schemas';
export type { ApiResponse };

// User role types (for both auth and team contexts)
export type Role = 'farmer' | 'manager' | 'employee';
