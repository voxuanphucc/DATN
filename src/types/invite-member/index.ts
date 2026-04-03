/**
 * Invite Member API Types
 */

import { type MemberDto } from '../get-members';
import { type InvitationDto } from '../get-invitations';

export interface InviteMemberRequest {
  email: string;
  role: 'manager' | 'employee' | 'accountant';
}

export interface InviteMemberResponse {
  invitation: InvitationDto;
  message: string;
}
