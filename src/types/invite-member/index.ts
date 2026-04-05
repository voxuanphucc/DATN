/**
 * Invite Member API Types
 */

import { type InvitationDto } from '../get-invitations';

export interface InviteMemberRequest {
  email: string;
  role: 'manager' | 'employee';
}

export interface InviteMemberResponse {
  invitation: InvitationDto;
  message: string;
}
