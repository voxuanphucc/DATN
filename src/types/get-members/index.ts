/**
 * Get Members API Types
 */

export interface MemberDto {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'manager' | 'employee';
  status: 'active' | 'pending' | 'rejected';
  avatar?: string;
  joinedAt: string;
  expiresAt?: string;
}

export interface GetMembersResponse {
  members: MemberDto[];
  total: number;
}
