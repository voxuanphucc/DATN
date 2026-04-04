/**
 * Accept Invitation API Types (Public endpoint)
 */

import { type InvitationDto } from '../get-invitations';

export interface AcceptInvitationRequest {
  token: string;
  email?: string;
  fullName?: string;
  password?: string;
}

export interface AcceptInvitationResponse {
  user: {
    id: string;
    fullName: string;
    email: string;
    role: string;
  };
  token: string;
  message: string;
}
