/**
 * Change Role API Types
 */

import { type MemberDto } from '../get-members';

export interface ChangeRoleRequest {
  memberId: string;
  newRole: 'manager' | 'employee';
}

export interface ChangeRoleResponse {
  member: MemberDto;
  message: string;
}
