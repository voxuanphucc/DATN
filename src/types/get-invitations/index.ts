/**
 * Get Invitations API Types
 */

export interface InvitationDto {
  id: string;
  email: string;
  role: 'owner' | 'manager' | 'employee';
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  invitedAt: string;
  expiresAt: string;
  token: string;
  invitedBy: string;
}

export interface GetInvitationsResponse {
  invitations: InvitationDto[];
  total: number;
}
