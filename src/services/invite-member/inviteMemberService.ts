/**
 * Invite Member Service
 */

import axiosInstance from '../../config/axios';
import { type InviteMemberRequest, type InviteMemberResponse } from '../../types/invite-member';
import { type ApiResponse } from '../../types/common';

class InviteMemberService {
  async inviteMember(data: InviteMemberRequest): Promise<ApiResponse<InviteMemberResponse>> {
    const response = await axiosInstance.post('/team/invitations', data);
    return response.data;
  }
}

export const inviteMemberService = new InviteMemberService();
